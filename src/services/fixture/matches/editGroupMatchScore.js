import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import matchService from './common/matchService.js'
import stageService from '../stages/common/stageService.js'
import teamGroupService from '../teamGroup/common/teamGroupService.js'
import { sequelize } from '../../../database/connection.js'
import TeamGroupConstants from '../../../constants/teamGroup/teamGroupConstants.js'

const { ERROR_WHILE_EDITING_MATCH, YOU_MUST_DEFINE_BOTH_RESULTS } = errorCodes.matchErrors
const { NO_MATCHING_TEAM_AND_GROUP_FOUND } = errorCodes.groupErrors
const { SELECTED_STAGE_DOES_NOT_EXIST } = errorCodes.stageErrors

const { WON, LOST, DRAWN } = TeamGroupConstants
const editGroupMatchScore = async(req, res) => {
    const {
        stageId,
        groupId,
        localTeamId,
        visitorTeamId,
        localTeamScore,
        visitorTeamScore,
        localTeamPenaltyScore,
        visitorTeamPenaltyScore,
        matchId
    } = req.body

    const values = {
        matchId,
        localTeamScore,
        visitorTeamScore
    }
    // los valores del resultado deben estar ambos definidos o ambos null (no puede ser uno null y el otro definido)
    const currentResultsNotValid =
    (localTeamScore === null || localTeamScore === undefined || localTeamScore === '') !==
    (visitorTeamScore === null || visitorTeamScore === undefined || visitorTeamScore === '')

    if (currentResultsNotValid) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: [{ msg: YOU_MUST_DEFINE_BOTH_RESULTS }] })
    }

    const editTeamGroup = async(teamGroup, pointsToAdd, updateField, transaction) => {
        await teamGroupService.updateTeamGroup(
            teamGroup.teamGroupId,
            {
                totalTeamPoints: teamGroup.totalTeamPoints + pointsToAdd,
                [updateField]: teamGroup[updateField] + 1
            },
            transaction
        )
    }

    const removePoints = async(teamGroup, pointsToRemove, updateField, transaction) => {
        await teamGroupService.updateTeamGroup(
            teamGroup.teamGroupId,
            {
                totalTeamPoints: teamGroup.totalTeamPoints - pointsToRemove,
                [updateField]: teamGroup[updateField] - 1
            },
            transaction
        )
    }

    // Los penales deben ser nulos en fase de grupos
    if (localTeamPenaltyScore || visitorTeamPenaltyScore) {
        req.body.localTeamPenaltyScore = null
        req.body.visitorTeamPenaltyScore = null
    }

    try {
        // 🔹 Obtener el partido ANTES de cualquier modificación
        const existingMatch = await matchService.getOneById(matchId)

        const previousLocalScore = existingMatch?.localTeamScore
        const previousVisitorScore = existingMatch?.visitorTeamScore

        const previousResultsUndefined =
            previousLocalScore === null || previousVisitorScore === null ||
            previousLocalScore === undefined || previousVisitorScore === undefined

        // Validar si ambos equipos tienen resultado
        const areCurrentResultsUndefined =
            localTeamScore === null || visitorTeamScore === null ||
            localTeamScore === undefined || visitorTeamScore === undefined

        if (areCurrentResultsUndefined && previousResultsUndefined) {
            req.body.localTeamScore = null
            req.body.visitorTeamScore = null
            const m = await matchService.edit({ values })
            return res.status(StatusCodes.OK).json()
        }

        // Si hay resultados definidos, procedemos a intentar guardar los datos con una transaccion
        // no solo en match, sino tambien en teamGroup.

        // 🔹 Obtener puntos de la tabla Stage
        const stage = await stageService.getOneById(stageId)
        if (!stage) {
            return res.status(StatusCodes.NOT_FOUND).json({ errors: [{ msg: SELECTED_STAGE_DOES_NOT_EXIST }] })
        }

        const { wonPoints, lostPoints, drawnPoints } = stage

        // 🔹 Obtener los TeamGroup de ambos equipos
        const localTeamGroup = await teamGroupService.getOneByGroupIdAndTeamId({ groupId, teamId: localTeamId })
        const visitorTeamGroup = await teamGroupService.getOneByGroupIdAndTeamId({ groupId, teamId: visitorTeamId })
        if (!localTeamGroup || !visitorTeamGroup) {
            return res.status(StatusCodes.NOT_FOUND).json({ errors: [{ msg: NO_MATCHING_TEAM_AND_GROUP_FOUND }] })
        }

        const transaction = await sequelize.transaction()

        try {
            // 🔹 Calcular el resultado anterior
            let previousResult
            if (previousLocalScore > previousVisitorScore) previousResult = 'LOCAL_WON'
            else if (previousLocalScore < previousVisitorScore) previousResult = 'VISITOR_WON'
            else previousResult = 'DRAW'

            // 🔹 Calcular el nuevo resultado
            let newResult
            if (localTeamScore > visitorTeamScore) newResult = 'LOCAL_WON'
            else if (localTeamScore < visitorTeamScore) newResult = 'VISITOR_WON'
            else newResult = 'DRAW'

            if (previousResultsUndefined && !areCurrentResultsUndefined) {
                // 🔹 Aplicar los nuevos puntos según el nuevo resultado
                // 🔹 Aumentar en 1 el estado del resultado (WON, LOST, DRAWN) y setear resultado partido
                if (newResult === 'LOCAL_WON') {
                    await editTeamGroup(localTeamGroup, wonPoints, WON, transaction)
                    await editTeamGroup(visitorTeamGroup, lostPoints, LOST, transaction)
                } else if (newResult === 'VISITOR_WON') {
                    await editTeamGroup(visitorTeamGroup, wonPoints, WON, transaction)
                    await editTeamGroup(localTeamGroup, lostPoints, LOST, transaction)
                } else if (newResult === 'DRAW') {
                    await editTeamGroup(localTeamGroup, drawnPoints, DRAWN, transaction)
                    await editTeamGroup(visitorTeamGroup, drawnPoints, DRAWN, transaction)
                }
                // 🔹 Actualizar el partido con los nuevos resultados
                await matchService.edit({ values }, transaction)
                await transaction.commit()
                return res.status(StatusCodes.OK).json()
            }

            if (areCurrentResultsUndefined && !previousResultsUndefined) {
                // 🔹 Restar puntos anteriores, descontar en 1 el estado del resultado (WON, LOST, DRAWN) y setear resultado en null
                if (previousResult === 'LOCAL_WON') {
                    await removePoints(localTeamGroup, wonPoints, WON, transaction)
                    await removePoints(visitorTeamGroup, lostPoints, LOST, transaction)
                } else if (previousResult === 'VISITOR_WON') {
                    await removePoints(visitorTeamGroup, wonPoints, WON, transaction)
                    await removePoints(localTeamGroup, lostPoints, LOST, transaction)
                } else if (previousResult === 'DRAW') {
                    await removePoints(localTeamGroup, drawnPoints, DRAWN, transaction)
                    await removePoints(visitorTeamGroup, drawnPoints, DRAWN, transaction)
                }
                // 🔹 Actualizar el partido con los nuevos resultados
                await matchService.edit({ values }, transaction)
                await transaction.commit()
                return res.status(StatusCodes.OK).json()
            }

            // 🔹 Si el resultado cambió, ajustar puntos
            if (previousResult !== newResult) {
                if (previousResult === 'LOCAL_WON') {
                    await removePoints(localTeamGroup, wonPoints, WON, transaction)
                    await removePoints(visitorTeamGroup, lostPoints, LOST, transaction)
                } else if (previousResult === 'VISITOR_WON') {
                    await removePoints(visitorTeamGroup, wonPoints, WON, transaction)
                    await removePoints(localTeamGroup, lostPoints, LOST, transaction)
                } else if (previousResult === 'DRAW') {
                    await removePoints(localTeamGroup, drawnPoints, DRAWN, transaction)
                    await removePoints(visitorTeamGroup, drawnPoints, DRAWN, transaction)
                }

                // 🔹 Obtener nuevas instancias modificadas de base de datos
                // 🔹 Aplicar los nuevos puntos según el nuevo resultado
                await localTeamGroup.reload({ transaction })
                await visitorTeamGroup.reload({ transaction })

                // const localTeamGroupUpdated = await teamGroupService.getOneByGroupIdAndTeamId({ groupId, teamId: localTeamId, transaction })
                // const visitorTeamGroupUpdated = await teamGroupService.getOneByGroupIdAndTeamId({ groupId, teamId: visitorTeamId, transaction })
                if (newResult === 'LOCAL_WON') {
                    await editTeamGroup(localTeamGroup, wonPoints, WON, transaction)
                    await editTeamGroup(visitorTeamGroup, lostPoints, LOST, transaction)
                } else if (newResult === 'VISITOR_WON') {
                    await editTeamGroup(visitorTeamGroup, wonPoints, WON, transaction)
                    await editTeamGroup(localTeamGroup, lostPoints, LOST, transaction)
                } else if (newResult === 'DRAW') {
                    await editTeamGroup(localTeamGroup, drawnPoints, DRAWN, transaction)
                    await editTeamGroup(visitorTeamGroup, drawnPoints, DRAWN, transaction)
                }
                // 🔹 Actualizar el partido con los nuevos resultados
                await matchService.edit({ values }, transaction)
                await transaction.commit()
                return res.status(StatusCodes.OK).json()
            }

            // 🔹 Actualizar el partido con los nuevos resultados si nada cambio
            await matchService.edit({ values }, transaction)
            await transaction.commit()
            return res.status(StatusCodes.OK).json()
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    } catch (err) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: [{ msg: ERROR_WHILE_EDITING_MATCH }]
        })
    }
}

export default editGroupMatchScore
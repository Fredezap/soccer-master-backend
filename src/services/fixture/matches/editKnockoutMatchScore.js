import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import matchService from './common/matchService.js'

const {
    ERROR_WHILE_EDITING_MATCH, MATCH_RESULT_MUST_BE_DEFINED_BEFORE_SETTING_PENALTY_RESULTS,
    CANNOT_DEFINE_PENALTY_IF_NO_DRAW, PENALTY_RESULT_MUST_BE_DIFFERENT,
    YOU_MUST_DEFINE_PENALTY_SCORES_IF_IT_IS_A_DRAW
} = errorCodes.matchErrors

const EditKnockoutMatchScore = async(req, res) => {
    const {
        localTeamScore,
        visitorTeamScore,
        localTeamPenaltyScore,
        visitorTeamPenaltyScore,
        matchId
    } = req.body

    const values = {
        localTeamScore,
        visitorTeamScore,
        localTeamPenaltyScore,
        visitorTeamPenaltyScore,
        matchId
    }

    const isDraw = localTeamScore === visitorTeamScore && localTeamScore !== null && visitorTeamScore !== null

    const isMainScoreDefined = (
        localTeamScore !== null &&
        localTeamScore !== undefined &&
        localTeamScore !== ''
    ) && (
        visitorTeamScore !== null &&
        visitorTeamScore !== undefined &&
        visitorTeamScore !== ''
    )

    const penaltiesProvided =
    localTeamPenaltyScore !== null && localTeamPenaltyScore !== undefined && localTeamPenaltyScore !== '' &&
    visitorTeamPenaltyScore !== null && visitorTeamPenaltyScore !== undefined && visitorTeamPenaltyScore !== ''

    // 🔸 1. Si hay penales pero los scores principales no están definidos => error
    if (penaltiesProvided && !isMainScoreDefined) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: [{ msg: MATCH_RESULT_MUST_BE_DEFINED_BEFORE_SETTING_PENALTY_RESULTS }]
        })
    }

    // 🔸 2. Si hay penales pero no hubo empate => error
    if (penaltiesProvided && !isDraw) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: [{ msg: CANNOT_DEFINE_PENALTY_IF_NO_DRAW }]
        })
    }

    // 🔸 3. Penales no pueden ser iguales
    if (penaltiesProvided && localTeamPenaltyScore === visitorTeamPenaltyScore) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: [{ msg: PENALTY_RESULT_MUST_BE_DIFFERENT }]
        })
    }

    // 🔸 4. Penales no definidos y hubo empate
    if (!penaltiesProvided && isDraw) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: [{ msg: YOU_MUST_DEFINE_PENALTY_SCORES_IF_IT_IS_A_DRAW }]
        })
    }

    try {
        const existingMatch = await matchService.edit({ values }, matchId)

        // Aquí podrías continuar con la actualización
        // await matchService.updateScore(matchId, { ... })

        return res.status(StatusCodes.OK).json({ success: true })
    } catch (err) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: [{ msg: ERROR_WHILE_EDITING_MATCH }]
        })
    }
}

export default EditKnockoutMatchScore
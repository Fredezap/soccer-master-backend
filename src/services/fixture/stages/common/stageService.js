/* eslint-disable no-useless-catch */
import { where } from 'sequelize'
import { Group } from '../../../../models/groupModel.js'
import { Match } from '../../../../models/matchModel.js'
import { Stage } from '../../../../models/stageModel.js'
import { Team } from '../../../../models/teamModel.js'
import errorCodes from '../../../../constants/errors/errorCodes.js'
const { SELECTED_STAGE_DOES_NOT_EXIST, PLEASE_SET_POINTS_PER_MATCH_BEFORE_EDITING } = errorCodes.stageErrors

const create = async(data) => {
    const { name, type, order, tournamentId } = data

    try {
        const [response, created] = await Stage.findOrCreate({
            where: { name, tournamentId, deleted: false },
            defaults: { type, order }
        })

        return { response, created }
    } catch (error) {
        throw error
    }
}

const edit = async({ values }) => {
    const { pointsPerResult, name, type, order, stageId } = values
    const { wonPoints, drawnPoints, lostPoints } = pointsPerResult

    try {
        await Stage.update(
            {
                name,
                type,
                order,
                wonPoints,
                lostPoints,
                drawnPoints
            },
            {
                where: { stageId, deleted: false }
            }
        )
    } catch (error) {
        throw error
    }
}

const getOneByName = async(name, tournamentId) => {
    return await Stage.findOne({ where: { name, tournamentId, deleted: false } })
}

const getOneById = async(id) => {
    return Stage.findOne({ where: { stageId: id, deleted: false } })
}

const getOneByOrder = async(order, tournamentId) => {
    return await Stage.findOne({ where: { order, tournamentId, deleted: false } })
}

const getAll = async() => {
    const stages = await Stage.findAll({
        where: { deleted: false },
        include: {
            model: Match,
            where: { deleted: false },
            required: false,
            include: [
                {
                    model: Team,
                    as: 'LocalTeam',
                    where: { deleted: false },
                    required: false,
                    include: [
                        {
                            model: Group,
                            where: { deleted: false },
                            required: false,
                            through: { attributes: [] }
                        }
                    ]
                },
                {
                    model: Team,
                    as: 'VisitorTeam',
                    where: { deleted: false },
                    required: false,
                    include: [
                        {
                            model: Group,
                            where: { deleted: false },
                            required: false,
                            through: { attributes: [] }
                        }
                    ]
                }
            ]
        },
        order: [['order', 'ASC']]
    })
    return stages
}

const getAllStagesByTournament = async({ tournamentId }) => {
    const stages = await Stage.findAll({
        where: {
            tournamentId,
            deleted: false
        },
        include: {
            model: Match,
            where: { deleted: false },
            required: false,
            include: [
                {
                    model: Team,
                    as: 'LocalTeam',
                    where: { deleted: false },
                    required: true, // Importante para que no devuelva si no tiene grupo
                    include: [
                        {
                            model: Group,
                            where: { deleted: false },
                            required: true, // Asegura que solo equipos con grupos válidos estén incluidos
                            through: {
                                attributes: []
                            }
                        }
                    ]
                },
                {
                    model: Team,
                    as: 'VisitorTeam',
                    where: { deleted: false },
                    required: true, // Importante para que no devuelva si no tiene grupo
                    include: [
                        {
                            model: Group,
                            where: { deleted: false },
                            required: true,
                            through: {
                                attributes: []
                            }
                        }
                    ]
                }
            ]
        },
        order: [['order', 'ASC']]
    })

    return stages
}

const destroy = async({ stageId }) => {
    try {
        const result = await Stage.update(
            { deleted: true },
            {
                where: { stageId, deleted: false }
            }
        )

        if (result[0] === 0) {
            throw new Error(`Stage with ID ${stageId} not found`)
        }

        return result
    } catch (error) {
        throw error
    }
}

const getKnockoutStagesWithTeams = async() => {
    try {
        const stages = await Stage.findAll({
            where: { type: 'knockout', deleted: false },
            include: [
                {
                    model: Match,
                    where: { deleted: false },
                    required: false,
                    include: [
                        {
                            model: Team,
                            as: 'LocalTeam',
                            where: { deleted: false },
                            required: false
                        },
                        {
                            model: Team,
                            as: 'VisitorTeam',
                            where: { deleted: false },
                            required: false
                        }
                    ]
                }
            ]
        })

        const groupedByStageId = stages.reduce((acc, stage) => {
            const { stageId, name, order, type } = stage
            if (!acc[stageId]) {
                acc[stageId] = { stageId, name, order, type, Matches: [] }
            }

            stage.Matches.forEach(match => {
                acc[stageId].Matches.push({
                    matchId: match.matchId,
                    localTeam: match.LocalTeam,
                    visitorTeam: match.VisitorTeam,
                    date: match.date,
                    time: match.time,
                    location: match.location
                })
            })

            return acc
        }, {})

        return groupedByStageId
    } catch (error) {
        throw error
    }
}

const getKnockoutStagesByTournament = async(tournamentId) => {
    try {
        const stages = await Stage.findAll({
            where: { type: 'knockout', tournamentId, deleted: false },
            include: [{
                model: Match,
                where: { deleted: false },
                required: false, // ⚠️ para traer la stage aunque no haya partidos
                include: [
                    {
                        model: Team,
                        as: 'LocalTeam',
                        where: { deleted: false },
                        required: false // ⚠️ trae aunque falte un equipo
                    },
                    {
                        model: Team,
                        as: 'VisitorTeam',
                        where: { deleted: false },
                        required: false
                    }
                ]
            }]
        })

        // Filtrar partidos con ambos equipos no eliminados y no nulos
        const filteredStages = stages.map(stage => {
            const validMatches = (stage.Matches || []).filter(match =>
                match.LocalTeam && !match.LocalTeam.deleted &&
                match.VisitorTeam && !match.VisitorTeam.deleted
            )

            return {
                ...stage.get({ plain: true }),
                Matches: validMatches
            }
        })
        // Si quieres eliminar stages vacías:
        // .filter(stage => stage.Matches.length > 0)

        return filteredStages
    } catch (error) {
        throw error
    }
}

const checkPointsPerMatchAreSet = async(stageId) => {
    const stage = await Stage.findOne({ where: { stageId, deleted: false } })

    if (!stage) {
        return { success: false, error: SELECTED_STAGE_DOES_NOT_EXIST }
    }

    const pointsPerMatchAreSetted = stage.wonPoints !== 0 || stage.drawnPoints !== 0 || stage.lostPoints !== 0
    if (!pointsPerMatchAreSetted) return { success: false, error: PLEASE_SET_POINTS_PER_MATCH_BEFORE_EDITING }

    return { success: true }
}

const stageService = {
    create,
    edit,
    getOneByName,
    getOneByOrder,
    getAll,
    getAllStagesByTournament,
    getOneById,
    destroy,
    getKnockoutStagesWithTeams,
    getKnockoutStagesByTournament,
    checkPointsPerMatchAreSet
}

export default stageService
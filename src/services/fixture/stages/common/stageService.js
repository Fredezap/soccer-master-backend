/* eslint-disable no-useless-catch */
import { where } from 'sequelize'
import { Group } from '../../../../models/groupModel.js'
import { Match } from '../../../../models/matchModel.js'
import { Stage } from '../../../../models/stageModel.js'
import { Team } from '../../../../models/teamModel.js'
import { Tournament } from '../../../../models/tournamentModel.js'
import errorCodes from '../../../../constants/errors/errorCodes.js'
const { SELECTED_STAGE_DOES_NOT_EXIST, PLEASE_SET_POINTS_PER_MATCH_BEFORE_EDITING } = errorCodes.stageErrors

const create = async(data) => {
    const { name, type, order, tournamentId } = data

    try {
        const [response, created] = await Stage.findOrCreate({
            where: { name, tournamentId },
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
                where: { stageId }
            }
        )
    } catch (error) {
        throw error
    }
}

const getOneByName = async(name, tournamentId) => {
    return await Stage.findOne({ where: { name, tournamentId } })
}

const getOneById = async(id) => {
    return Stage.findByPk(id)
}

const getOneByOrder = async(order, tournamentId) => {
    return await Stage.findOne({ where: { order, tournamentId } })
}

const getAll = async() => {
    const stages = await Stage.findAll({
        include: {
            model: Match,
            include: [
                {
                    model: Team,
                    as: 'LocalTeam',
                    include: [
                        {
                            model: Group,
                            through: { attributes: [] }
                        }
                    ]
                },
                {
                    model: Team,
                    as: 'VisitorTeam',
                    include: [
                        {
                            model: Group,
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
        include: {
            model: Match,
            include: [
                {
                    model: Team,
                    as: 'LocalTeam',
                    include: [
                        {
                            model: Group,
                            through: { attributes: [] }
                        }
                    ]
                },
                {
                    model: Team,
                    as: 'VisitorTeam',
                    include: [
                        {
                            model: Group,
                            through: { attributes: [] }
                        }
                    ]
                }
            ]
        },
        where: {
            tournamentId
        },
        order: [['order', 'ASC']]
    })

    return stages
}

const destroy = async({ stageId }) => {
    try {
        const result = await Stage.destroy({
            where: { stageId }
        })

        if (result === 0) {
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
            where: { type: 'knockout' },
            include: [
                {
                    model: Match,
                    include: [
                        {
                            model: Team,
                            as: 'LocalTeam'
                        },
                        {
                            model: Team,
                            as: 'VisitorTeam'
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
            where: { type: 'knockout', tournamentId },
            include: [
                {
                    model: Match,
                    include: [
                        {
                            model: Team,
                            as: 'LocalTeam'
                        },
                        {
                            model: Team,
                            as: 'VisitorTeam'
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

const checkPointsPerMatchAreSet = async(stageId) => {
    const stage = await Stage.findByPk(stageId)

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
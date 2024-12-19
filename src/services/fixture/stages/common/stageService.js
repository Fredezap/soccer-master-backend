/* eslint-disable no-useless-catch */
import { where } from 'sequelize'
import { Group } from '../../../../models/groupModel.js'
import { Match } from '../../../../models/matchModel.js'
import { Stage } from '../../../../models/stageModel.js'
import { Team } from '../../../../models/teamModel.js'
import { Tournament } from '../../../../models/tournamentModel.js'

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

const getOneByName = async(name) => {
    return await Stage.findOne({ where: { name } })
}

const getOneById = async(id) => {
    return Stage.findByPk(id)
}

const getOneByOrder = async(order) => {
    return await Stage.findOne({ where: { order } })
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

const stageService = {
    create,
    getOneByName,
    getOneByOrder,
    getAll,
    getAllStagesByTournament,
    getOneById,
    destroy,
    getKnockoutStagesWithTeams
}

export default stageService
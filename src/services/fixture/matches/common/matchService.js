/* eslint-disable no-useless-catch */
import { Team } from '../../../../models/teamModel.js'
import { Stage } from '../../../../models/stageModel.js'
import { Match } from '../../../../models/matchModel.js'

const create = async(values) => {
    const {
        stageId,
        localTeamId,
        visitorTeamId,
        localTeamPlaceholder,
        visitorTeamPlaceholder,
        date,
        time,
        location
    } = values

    const newMatchData = {
        stageId,
        date,
        time,
        location,
        ...(localTeamId && { localTeamId }),
        ...(visitorTeamId && { visitorTeamId }),
        ...(localTeamPlaceholder && { localTeamPlaceholder }),
        ...(visitorTeamPlaceholder && { visitorTeamPlaceholder })
    }

    const newMatch = await Match.create(newMatchData)
    return newMatch
}

const checkIfMatchExistsKnownTeams = async(stageId, localTeamId, visitorTeamId, date, time) => {
    try {
        const match = await Match.findOne({
            where: {
                stageId,
                localTeamId,
                visitorTeamId,
                date,
                time
            }
        })

        if (match) {
            return { success: true, match }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false }
    }
}

const checkIfMatchExistsUnknownTeams = async(stageId, localTeamPlaceholder, visitorTeamPlaceholder, date, time) => {
    try {
        const match = await Match.findOne({
            where: {
                stageId,
                localTeamPlaceholder,
                visitorTeamPlaceholder,
                date,
                time
            }
        })

        if (match) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false }
    }
}

const getAllMatchesByDate = async() => {
    try {
        const matches = await Match.findAll({
            include: [
                {
                    model: Team,
                    as: 'localTeam',
                    attributes: ['teamId', 'name']
                },
                {
                    model: Team,
                    as: 'visitorTeam',
                    attributes: ['teamId', 'name']
                },
                {
                    model: Stage,
                    as: 'stage',
                    attributes: ['stageId', 'name']
                }
            ],
            order: [['date', 'ASC']]
        })

        const groupedByDate = matches.reduce((acc, match) => {
            const matchDate = match.date.toISOString().split('T')[0]
            if (!acc[matchDate]) {
                acc[matchDate] = []
            }
            acc[matchDate].push(match)
            return acc
        }, {})

        return groupedByDate
    } catch (error) {
        throw error
    }
}

const getOneById = async(id) => {
    return Match.findByPk(id)
}

const destroy = async({ matchId }) => {
    try {
        const result = await Match.destroy({
            where: { matchId }
        })

        if (result === 0) {
            throw new Error(`Match with ID ${matchId} not found`)
        }

        return result
    } catch (error) {
        throw error
    }
}

const edit = async({ values }) => {
    const {
        matchId,
        stageId,
        localTeamId,
        visitorTeamId,
        localTeamPlaceholder,
        visitorTeamPlaceholder,
        localTeamScore,
        visitorTeamScore,
        date,
        time,
        location
    } = values

    try {
        await Match.update(
            {
                stageId,
                localTeamId,
                visitorTeamId,
                localTeamPlaceholder,
                visitorTeamPlaceholder,
                localTeamScore,
                visitorTeamScore,
                date,
                time,
                location
            },
            {
                where: { matchId }
            }
        )
    } catch (error) {
        throw error
    }
}

const matchService = {
    create,
    getAllMatchesByDate,
    checkIfMatchExistsKnownTeams,
    checkIfMatchExistsUnknownTeams,
    getOneById,
    destroy,
    edit
}

export default matchService
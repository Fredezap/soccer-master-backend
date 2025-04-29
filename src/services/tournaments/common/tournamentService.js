import { Op } from 'sequelize'
import { Tournament } from '../../../models/tournamentModel.js'
import { sequelize } from '../../../database/connection.js'
import { Match } from '../../../models/matchModel.js'
import { Team } from '../../../models/teamModel.js'
import { Player } from '../../../models/playerModel.js'
import { Group } from '../../../models/groupModel.js'
import { TeamGroup } from '../../../models/teamGroupModel.js'

const create = async({ name, date }) => {
    return await Tournament.create({ name, date })
}

const findOneByNameAndDate = async(values) => {
    const { date, name } = values

    const formattedDate = date instanceof Date
        ? date.toISOString().split('T')[0]
        : date.split('T')[0]

    const existingTournament = await Tournament.findOne({
        where: {
            [Op.and]: [
                sequelize.where(
                    sequelize.fn('DATE', sequelize.col('date')),
                    formattedDate
                ),
                { name }
            ]
        }
    })
    return existingTournament
}

const findOneById = async(tournamentId) => {
    const tournament = await Tournament.findByPk(tournamentId)

    if (!tournament) return null

    const [Teams, Stages, Videos, Emails, Contact] = await Promise.all([
        tournament.getTeams({
            include: [
                { model: Player },
                {
                    model: Match,
                    as: 'LocalMatches',
                    include: [{ model: Team, as: 'VisitorTeam' }]
                },
                {
                    model: Match,
                    as: 'VisitorMatches',
                    include: [{ model: Team, as: 'LocalTeam' }]
                }
            ]
        }),
        tournament.getStages({
            include: [
                {
                    model: Group,
                    include: [
                        {
                            model: Team,
                            through: { model: TeamGroup }
                        }
                    ]
                },
                {
                    model: Match,
                    include: [
                        { model: Team, as: 'LocalTeam' },
                        { model: Team, as: 'VisitorTeam' }
                    ]
                }
            ]
        }),
        tournament.getVideos(),
        tournament.getEmails(),
        tournament.getContact()
    ])

    return {
        ...tournament.toJSON(),
        Teams,
        Stages,
        Videos,
        Emails,
        Contact
    }
}

const findAll = async() => {
    return await Tournament.findAll()
}

const update = async(data) => {
    const [updatedRows] = await Tournament.update(
        data,
        { where: { tournamentId: data.tournamentId } }
    )

    if (updatedRows > 0) {
        const tournamentResult = await Tournament.findByPk(data.tournamentId)
        return { success: true, tournamentDetails: tournamentResult }
    } else {
        return { success: false }
    }
}

const tournamentService = {
    create,
    findOneByNameAndDate,
    findOneById,
    findAll,
    update
}

export default tournamentService
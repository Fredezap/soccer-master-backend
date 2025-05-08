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

    let [Teams, Stages, Videos, Emails, Contact] = await Promise.all([
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
                            through: {
                                model: TeamGroup
                            },
                            order: [
                                [TeamGroup, 'totalTeamPoints', 'DESC'],
                                [TeamGroup, 'goalDifference', 'DESC'],
                                [TeamGroup, 'goalsFor', 'DESC']
                            ]
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

    Stages = Stages.map(stage => {
        if (stage.type !== 'group') return stage

        const updatedGroups = stage.Groups.map(group => {
            const sortedTeams = group.Teams
                .map(team => ({
                    ...team.get({ plain: true }),
                    TeamGroup: team.TeamGroup.get({ plain: true })
                }))
                .sort((a, b) => {
                    if (b.TeamGroup.totalTeamPoints !== a.TeamGroup.totalTeamPoints) { return b.TeamGroup.totalTeamPoints - a.TeamGroup.totalTeamPoints }
                    if (b.TeamGroup.goalDifference !== a.TeamGroup.goalDifference) { return b.TeamGroup.goalDifference - a.TeamGroup.goalDifference }
                    return b.TeamGroup.goalsFor - a.TeamGroup.goalsFor
                })

            // Log ordenado
            console.log(`Equipos ordenados en grupo "${group.name}":`)
            sortedTeams.forEach((team, i) => {
                const { name } = team
                const { totalTeamPoints, goalDifference, goalsFor } = team.TeamGroup
                console.log(`${i + 1}. ${name} - Pts: ${totalTeamPoints}, DG: ${goalDifference}, GF: ${goalsFor}`)
            })

            return {
                ...group.get({ plain: true }),
                Teams: sortedTeams
            }
        })

        return {
            ...stage.get({ plain: true }),
            Groups: updatedGroups
        }
    })

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
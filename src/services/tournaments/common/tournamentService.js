/* eslint-disable no-useless-catch */
import { Op } from 'sequelize'
import { Tournament } from '../../../models/tournamentModel.js'
import { sequelize } from '../../../database/connection.js'
import { Match } from '../../../models/matchModel.js'
import { Team } from '../../../models/teamModel.js'
import { Player } from '../../../models/playerModel.js'
import { Group } from '../../../models/groupModel.js'
import { TeamGroup } from '../../../models/teamGroupModel.js'
import fs from 'fs'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { ERROR_SAVING_IMAGE } = errorCodes.tournamentErrors

const checkImageData = (data) => {
    const filesArray = data.files || []

    const logoUrl = null
    const bgUrl = null

    // Tomamos los nombres que vinieron del body
    const logoName = data.tournamentLogo
    const bgName = data.mainBgImg

    for (const file of filesArray) {
        const { originalname, path } = file

        if (originalname === logoName) {
            if (!fs.existsSync(path)) throw new Error(ERROR_SAVING_IMAGE)
            data.tournamentLogo = path
        }

        if (originalname === bgName) {
            if (!fs.existsSync(path)) throw new Error(ERROR_SAVING_IMAGE)
            data.mainBgImg = path
        }
    }

    delete data.files
    return data
}
const create = async(data) => {
    const checkedData = checkImageData(data)
    delete checkedData.tournamentId
    return await Tournament.create({ ...checkedData })
}

const update = async(data) => {
    try {
        console.log('data en update: ', data)
        const checkedData = checkImageData(data)
        console.log('checkedData en update: ', checkedData)
        const [updatedRows] = await Tournament.update(
            checkedData,
            { where: { tournamentId: data.tournamentId } }
        )

        if (updatedRows > 0) {
            const tournamentResult = await Tournament.findByPk(data.tournamentId)
            return { success: true, tournamentDetails: tournamentResult }
        } else {
            return { success: false }
        }
    } catch (err) {
        throw err
    }
}

const findAllByNameAndDate = async({ name, date }) => {
    const formattedDate = date instanceof Date
        ? date.toISOString().split('T')[0]
        : date.split('T')[0]

    return await Tournament.findAll({
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

const tournamentService = {
    create,
    update,
    findAllByNameAndDate,
    findOneById,
    findAll
}

export default tournamentService
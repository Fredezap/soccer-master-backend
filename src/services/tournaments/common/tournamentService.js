/* eslint-disable no-useless-catch */
import { Op } from 'sequelize'
import { Tournament } from '../../../models/tournamentModel.js'
import { sequelize } from '../../../database/connection.js'
import { Match } from '../../../models/matchModel.js'
import { Team } from '../../../models/teamModel.js'
import { Player } from '../../../models/playerModel.js'
import { Group } from '../../../models/groupModel.js'
import fs from 'fs'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { User } from '../../../models/userModel.js'

const { ERROR_SAVING_IMAGE } = errorCodes.tournamentErrors

const checkImageData = (data) => {
    const filesArray = data.files || []

    const logoUrl = null
    const bgUrl = null

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
        const checkedData = checkImageData(data)
        const [updatedRows] = await Tournament.update(
            checkedData,
            {
                where: {
                    tournamentId: data.tournamentId,
                    deleted: false
                }
            }
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

const destroy = async({ tournamentId }) => {
    try {
        const result = await Tournament.update(
            { deleted: true },
            {
                where: { tournamentId, deleted: false }
            }
        )

        if (result[0] === 0) {
            throw new Error(`Tournament with ID ${tournamentId} not found`)
        }

        return result
    } catch (error) {
        throw error
    }
}

const findAllByNameAndDate = async({ name, date }) => {
    const formattedDate = date instanceof Date
        ? date.toISOString().split('T')[0]
        : date.split('T')[0]

    return await Tournament.findAll({
        where: {
            deleted: false,
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
    const tournament = await Tournament.findOne({ where: { tournamentId, deleted: false } })

    if (!tournament) return null

    const [
        Teams,
        Stages,
        Videos,
        Emails,
        Contact,
        MVPSurvey
    ] = await Promise.all([
        tournament.getTeams({
            where: { deleted: false },
            include: [
                {
                    model: Player,
                    where: { deleted: false },
                    required: false
                },
                {
                    model: Match,
                    as: 'LocalMatches',
                    where: { deleted: false },
                    required: false,
                    include: [
                        {
                            model: Team,
                            as: 'VisitorTeam',
                            where: { deleted: false },
                            required: false
                        }
                    ]
                },
                {
                    model: Match,
                    as: 'VisitorMatches',
                    where: { deleted: false },
                    required: false,
                    include: [
                        {
                            model: Team,
                            as: 'LocalTeam',
                            where: { deleted: false },
                            required: false
                        }
                    ]
                }
            ]
        }),

        tournament.getStages({
            where: { deleted: false },
            include: [
                {
                    model: Group,
                    where: { deleted: false },
                    required: false,
                    include: [
                        {
                            model: Team,
                            required: false,
                            where: { deleted: false },
                            through: {
                                where: { deleted: false }
                            }
                        }
                    ]
                },
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
        }),

        tournament.getVideos({ where: { deleted: false } }),
        tournament.getEmails({ where: { deleted: false } }),
        tournament.getContact(),
        tournament.getMVPSurveys({
            where: { deleted: false },
            limit: 1
        })
    ])

    return {
        ...tournament.toJSON(),
        Teams,
        Stages,
        Videos,
        Emails,
        Contact,
        MVPSurvey: MVPSurvey.length ? MVPSurvey[0] : null
    }
}

const findAll = async() => {
    return await Tournament.findAll({
        where: { deleted: false },
        include: {
            model: User,
            attributes: ['userId', 'email', 'username']
        }
    })
}

const findAllByUserId = async(userId) => {
    return await Tournament.findAll({
        where: {
            userId,
            deleted: false
        }
    })
}

const tournamentService = {
    create,
    update,
    destroy,
    findAllByNameAndDate,
    findOneById,
    findAll,
    findAllByUserId
}

export default tournamentService
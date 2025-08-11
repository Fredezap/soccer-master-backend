/* eslint-disable no-useless-catch */
import { Team } from '../../../models/teamModel.js'
import { Player } from '../../../models/playerModel.js'
import path from 'path'
import fs from 'fs'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { fileURLToPath } from 'url'

const { ERROR_WHILE_SAVING_IMAGE } = errorCodes.teamErrors

const create = async(req) => {
    const { name, players, tournamentId } = req.body
    const { file } = req
    let logoUrl = null
    const validPlayers = Array.isArray(players) && players.length > 0 ? players : []

    if (file) {
        const filename = file.path

        if (!fs.existsSync(filename)) {
            throw new Error(ERROR_WHILE_SAVING_IMAGE)
        }
        logoUrl = filename
    }

    try {
        const response = await Team.create(
            {
                name,
                Players: validPlayers,
                tournamentId,
                logoUrl
            },
            {
                include: validPlayers.length > 0 ? [Player] : []
            }
        )

        return response
    } catch (error) {
        throw error
    }
}

const getOneByName = async(name, tournamentId) => {
    const response = await Team.findOne({
        where: {
            name,
            tournamentId,
            deleted: false
        }
    })
    return response
}

const getOneById = async(id) => {
    return await Team.findOne({
        where: { teamId: id, deleted: false },
        include: [
            {
                model: Player,
                where: { deleted: false },
                required: false
            }
        ]
    })
}

const getAll = async() => {
    return await Team.findAll({
        where: { deleted: false },
        include: [
            {
                model: Player,
                where: { deleted: false },
                required: false
            }
        ]
    })
}

const getAllByTournamentId = async(tournamentId) => {
    return await Team.findAll({
        where: {
            tournamentId,
            deleted: false
        },
        include: [
            {
                model: Player,
                where: { deleted: false },
                required: false
            }
        ]
    })
}

const update = async({ logoUrl, file, teamId, name }, { transaction = null }) => {
    if (logoUrl === 'null') logoUrl = null // Convertimos 'null' (string) a null (valor)

    if (file) {
        const filename = file.path
        if (!fs.existsSync(filename)) {
            throw new Error(ERROR_WHILE_SAVING_IMAGE)
        }
        logoUrl = filename
    }

    return await Team.update(
        { name, logoUrl },
        {
            where: { teamId, deleted: false },
            transaction
        }
    )
}

const cleanUpOldImages = async() => {
    try {
        const teams = await Team.findAll({
            where: { deleted: false }
        })

        const teamImages = teams.map(team => {
            const logoUrl = team.logoUrl || ''
            const imageName = logoUrl.replace('uploads/team-images/', '')
            return imageName
        })

        const __filename = fileURLToPath(import.meta.url)
        const currentDir = path.dirname(__filename)
        const rootDir = path.resolve(currentDir, '../../../../')
        const uploadDir = path.join(rootDir, 'uploads/team-images')

        const filesInUploadDir = fs.readdirSync(uploadDir)

        filesInUploadDir.forEach(file => {
            if (!teamImages.includes(file)) {
                const filePath = path.join(uploadDir, file)
                fs.unlinkSync(filePath)
            }
        })
    } catch (error) {
    }
}

const destroy = async({ teamId }) => {
    try {
        const result = await Team.update(
            { deleted: true },
            {
                where: { teamId, deleted: false }
            }
        )

        if (result[0] === 0) {
            throw new Error(`Team with ID ${teamId} not found`)
        }

        return result
    } catch (error) {
        throw error
    }
}

const teamService = {
    create,
    getOneByName,
    getAll,
    getAllByTournamentId,
    getOneById,
    update,
    destroy,
    cleanUpOldImages
}

export default teamService
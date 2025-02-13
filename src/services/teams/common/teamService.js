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
    const response = await Team.findOne({ where: { name, tournamentId } })
    return response
}

const getOneById = async(id) => {
    return Team.findByPk(id, { include: [Player] })
}

const getAll = async() => {
    return await Team.findAll({
        include: [
            {
                model: Player
            }
        ]
    })
}

const getAllByTournamentId = async(tournamentId) => {
    return await Team.findAll({
        where: {
            tournamentId
        },
        include: [
            {
                model: Player
            }
        ]
    })
}

const update = async({ logoUrl, file, teamId, name }, { transaction = null }) => {
    // Chequeamos el tipo de datos, ya que al estar recibiendo los datos con 'Content-Type': 'multipart/form-data',
    // recibimos los values en el back convertidos a string
    if (logoUrl === 'null') logoUrl = null // Conviertimos null de string a object

    if (file) {
        const filename = file.path

        if (!fs.existsSync(filename)) {
            throw new Error(ERROR_WHILE_SAVING_IMAGE)
        }
        logoUrl = filename
    }

    return await Team.update(
        { name, logoUrl },
        { where: { teamId }, transaction }
    )
}

const cleanUpOldImages = async() => {
    try {
        const teams = await Team.findAll()

        // Extraer el nombre del archivo de logoUrl (sin la parte 'uploads/')
        const teamImages = teams.map(team => {
            const logoUrl = team.logoUrl || ''
            const imageName = logoUrl.replace('uploads/', '')
            return imageName
        })

        // Ruta para acceder a la carpeta 'uploads'
        const __filename = fileURLToPath(import.meta.url)
        const currentDir = path.dirname(__filename)
        const rootDir = path.resolve(currentDir, '../../../../')
        const uploadDir = path.join(rootDir, 'uploads')

        // Iterar sobre los archivos en la carpeta 'uploads' y eliminar los que no estén en uso
        const filesInUploadDir = fs.readdirSync(uploadDir)
        filesInUploadDir.forEach(file => {
            if (!teamImages.includes(file)) {
                const filePath = path.join(uploadDir, file)
                fs.unlinkSync(filePath)
            }
        })
    } catch (error) {}
}

const destroy = async({ teamId }) => {
    try {
        const result = await Team.destroy({
            where: { teamId }
        })

        if (result === 0) {
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
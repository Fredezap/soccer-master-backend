/* eslint-disable no-useless-catch */
import { Team } from '../../../models/teamModel.js'
import { Player } from '../../../models/playerModel.js'
import path from 'path'
import fs from 'fs'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { fileURLToPath } from 'url'
import { Video } from '../../../models/videosModel.js'
const { ERROR_WHILE_SAVING_IMAGE } = errorCodes.teamErrors

const create = async(req) => {
    const { title, videoUrl, tournamentId } = req.body
    const { file } = req
    let imageUrl = null

    if (file) {
        const filename = file.path

        if (!fs.existsSync(filename)) {
            throw new Error(ERROR_WHILE_SAVING_IMAGE)
        }
        imageUrl = filename
    }

    try {
        const response = await Video.create(
            {
                title,
                tournamentId,
                imageUrl,
                videoUrl
            }
        )

        return response
    } catch (error) {
        throw error
    }
}

const findOneById = async(id) => {
    return await Video.findByPk(id)
}

const getAllByTournamentId = async(tournamentId) => {
    return await Video.findAll({
        where: {
            tournamentId
        }
    })
}

const deleteImage = async(imageUrl) => {
    try {
        // Acceder a la imagen ruta donde la imagen esta guardada y tratar de eliminarla
        const __filename = fileURLToPath(import.meta.url)
        const currentDir = path.dirname(__filename)
        const rootDir = path.resolve(currentDir, '../../../../')
        const ImageDir = path.join(rootDir, imageUrl)
        if (ImageDir) fs.unlinkSync(ImageDir)
    } catch (error) {}
}

const destroy = async({ videoId }) => {
    try {
        const result = await Video.destroy({
            where: { videoId }
        })

        if (result === 0) {
            throw new Error(`Video with ID ${videoId} not found`)
        }

        return result
    } catch (error) {
        throw error
    }
}

const videoService = {
    create,
    getAllByTournamentId,
    findOneById,
    destroy,
    deleteImage
}

export default videoService
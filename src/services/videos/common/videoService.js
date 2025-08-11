/* eslint-disable no-useless-catch */
import path from 'path'
import fs from 'fs'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { fileURLToPath } from 'url'
import { Video } from '../../../models/videosModel.js'
const { ERROR_WHILE_SAVING_IMAGE } = errorCodes.videoErrors

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
        const response = await Video.create({
            title,
            tournamentId,
            imageUrl,
            videoUrl
        })

        return response
    } catch (error) {
        throw error
    }
}

const findOneById = async(id) => {
    return await Video.findOne({
        where: {
            videoId: id,
            deleted: false
        }
    })
}

const getAllByTournamentId = async(tournamentId) => {
    return await Video.findAll({
        where: {
            tournamentId,
            deleted: false
        }
    })
}

const deleteImage = async(imageUrl) => {
    try {
        const __filename = fileURLToPath(import.meta.url)
        const currentDir = path.dirname(__filename)
        const rootDir = path.resolve(currentDir, '../../../../')
        const ImageDir = path.join(rootDir, imageUrl)
        if (ImageDir) fs.unlinkSync(ImageDir)
    } catch (error) {
    }
}

const destroy = async({ videoId }) => {
    try {
        let result = await Video.update(
            { deleted: true },
            {
                where: {
                    videoId,
                    deleted: false
                }
            }
        )

        if (result[0] === 0) {
            result = null
            return result
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
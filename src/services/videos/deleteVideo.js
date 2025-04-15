import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import videoService from './common/videoService.js'

const { ERROR_WHILE_DELETING_VIDEO } = errorCodes.videoErrors
const deleteVideo = async(req, res) => {
    const { tournamentId, videoId, video: { imageUrl } } = req.body
    try {
        await videoService.destroy({ videoId })
        await videoService.deleteImage(imageUrl)
        const dbVideos = await videoService.getAllByTournamentId(tournamentId)
        return res.status(StatusCodes.OK).json({ dbVideos })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_DELETING_VIDEO }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default deleteVideo
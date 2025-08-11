import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import videoService from './common/videoService.js'

const { ERROR_WHILE_DELETING_VIDEO, VIDEO_NOT_FOUND } = errorCodes.videoErrors
const deleteVideo = async(req, res) => {
    const { tournamentId, videoId } = req.body
    let errors
    try {
        const result = await videoService.destroy({ videoId })
        if (!result) {
            errors = [{ msg: VIDEO_NOT_FOUND }]
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
        }
        const dbVideos = await videoService.getAllByTournamentId(tournamentId)
        return res.status(StatusCodes.OK).json({ dbVideos })
    } catch (err) {
        errors = [{ msg: ERROR_WHILE_DELETING_VIDEO }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default deleteVideo
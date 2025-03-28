import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import videoService from './common/videoService.js'

const { ERROR_WHILE_GETTING_VIDEOS } = errorCodes.videoErrors

const getAllVideosByTournamentId = async(req, res) => {
    try {
        const { tournamentId } = req.body
        if (tournamentId) {
            const dbVideos = await videoService.getAllByTournamentId(tournamentId)
            return res.status(StatusCodes.OK).json({ dbVideos })
        }
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_GETTING_VIDEOS }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default getAllVideosByTournamentId
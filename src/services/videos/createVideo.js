import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import videoService from './common/videoService.js'

const { ERROR_WHILE_CREATING_VIDEO, ERROR_WHILE_SAVING_IMAGE } = errorCodes.teamErrors
const createVideo = async(req, res) => {
    try {
        const { tournamentId } = req.body
        await videoService.create(req)
        const dbVideos = await videoService.getAllByTournamentId(tournamentId)
        return res.status(StatusCodes.CREATED).json({ dbVideos })
    } catch (err) {
        let errors = [{ msg: ERROR_WHILE_CREATING_VIDEO }]
        if (err.message === ERROR_WHILE_SAVING_IMAGE) errors = [{ msg: ERROR_WHILE_SAVING_IMAGE }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default createVideo
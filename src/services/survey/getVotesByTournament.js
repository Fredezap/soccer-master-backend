import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import surveyService from './common/surveyService.js'

const { ERROR_WHILE_FETCHING_VOTES } = errorCodes.mvpErrors

const GetVotesByTournament = async(req, res) => {
    try {
        const { tournamentId } = req.body

        const votes = await surveyService.getVotesByTournament(tournamentId)
        return res.status(StatusCodes.OK).json({ votes })
    } catch (err) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: [{ msg: ERROR_WHILE_FETCHING_VOTES }]
        })
    }
}

export default GetVotesByTournament
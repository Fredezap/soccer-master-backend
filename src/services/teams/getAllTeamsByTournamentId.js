import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'

const { ERROR_WHILE_GETTING_TEAMS } = errorCodes.teamErrors

const getAllTeamsByTournamentId = (req, res) => {
    const { tournament } = req.body
    if (tournament) {
        return res.status(StatusCodes.OK).json({ tournament })
    }
    const errors = [{ msg: ERROR_WHILE_GETTING_TEAMS }]
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
}

export default getAllTeamsByTournamentId
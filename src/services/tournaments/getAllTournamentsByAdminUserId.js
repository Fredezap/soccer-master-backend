import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentService from './common/tournamentService.js'

const getAllTournamentsByAdminUserId = async(req, res) => {
    const { AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS } = errorCodes.tournamentErrors
    try {
        const { userId } = req.body
        const allUserTournaments = await tournamentService.findAllByUserId(userId)
        return res.status(StatusCodes.OK).json({ allUserTournaments })
    } catch (err) {
        const errors = [{ msg: AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS }]
        return res.status(StatusCodes.NOT_FOUND).json({ errors })
    }
}

export default getAllTournamentsByAdminUserId
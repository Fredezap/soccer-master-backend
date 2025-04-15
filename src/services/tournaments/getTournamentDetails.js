import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentService from './common/tournamentService.js'

const getTournamentDetails = async(req, res) => {
    const { AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS } = errorCodes.tournamentErrors
    try {
        const { tournamentId } = req.body
        const tournamentDetails = await tournamentService.findOneById(tournamentId)
        return res.status(StatusCodes.OK).json({ tournamentDetails })
    } catch (err) {
        const errors = [{ msg: AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS }]
        return res.status(StatusCodes.NOT_FOUND).json({ errors })
    }
}

export default getTournamentDetails
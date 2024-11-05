import { StatusCodes } from 'http-status-codes'
import tournamentDatailService from './common/tournamentDatailService.js'
import errorCodes from '../../constants/errors/errorCodes.js'

const getTournamentDetails = async(req, res) => {
    const { ERROR_WHILE_GETTING_TOURNAMENT_DETAILS } = errorCodes.tournamentErrors
    try {
        const tournamentDetails = await tournamentDatailService.findOne()
        return res.status(StatusCodes.OK).json({ tournamentDetails })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_GETTING_TOURNAMENT_DETAILS }]
        return res.status(StatusCodes.NOT_FOUND).json({ errors })
    }
}

export default getTournamentDetails
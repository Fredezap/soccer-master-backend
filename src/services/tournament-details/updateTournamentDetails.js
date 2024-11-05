import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentDatailService from './common/tournamentDatailService.js'

const { AN_ERROR_OCURRED_WHILE_UPDATING_TOURNAMENT_DETAILS } = errorCodes.tournamentErrors
const updateTournamentDetails = async(req, res) => {
    try {
        const result = await tournamentDatailService.update(req.body)
        if (result.success) {
            return res.status(StatusCodes.OK).json({ tournamentDetails: result.tournamentDetails })
        } else {
            const errors = [{ msg: AN_ERROR_OCURRED_WHILE_UPDATING_TOURNAMENT_DETAILS }]
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
        }
    } catch (err) {
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_UPDATING_TOURNAMENT_DETAILS }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default updateTournamentDetails
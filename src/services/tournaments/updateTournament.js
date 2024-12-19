import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentService from './common/tournamentService.js'
import { checkExistingTournament } from './checkExistingTournament.js'

const { AN_ERROR_OCURRED_WHILE_UPDATING_TOURNAMENT_DETAILS } = errorCodes.tournamentErrors
const updateTournament = async(req, res) => {
    try {
        const { date, name } = req.body
        const values = { date, name }
        const tournamentExistsError = await checkExistingTournament(values)
        if (tournamentExistsError) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: [{ msg: tournamentExistsError.message }] })
        }
        const result = await tournamentService.update(req.body)
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

export default updateTournament
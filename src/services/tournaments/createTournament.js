import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentService from './common/tournamentService.js'
import { checkExistingTournament } from './checkExistingTournament.js'

const { ERROR_WHILE_CREATING_TOURNAMENT_DATE } = errorCodes.tournamentErrors
export const createTournament = async(req, res) => {
    try {
        const { date, name } = req.body
        const values = { date, name }
        const tournamentExistsError = await checkExistingTournament(values)
        if (tournamentExistsError) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: [{ msg: tournamentExistsError.message }] })
        }

        const tournamentDetails = await tournamentService.create({ name, date })
        return res.status(StatusCodes.CREATED).json({ tournamentDetails })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_CREATING_TOURNAMENT_DATE }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}
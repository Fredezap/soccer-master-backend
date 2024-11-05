import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentDatailService from './common/tournamentDatailService.js'
import { checkExistingTournament } from './checkExistingTournament.js'

const { ERROR_WHILE_CREATING_TOURNAMENT_DATE } = errorCodes.tournamentErrors
export const createTournamentDetails = async(req, res) => {
    try {
        const tournamentExistsError = await checkExistingTournament(req.body.date, req.body.name)

        if (tournamentExistsError) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: [{ msg: tournamentExistsError.message }] })
        }

        const tournamentDatails = await tournamentDatailService.create(req.body)
        return res.status(StatusCodes.CREATED).json({ tournamentDatails })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_CREATING_TOURNAMENT_DATE }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}
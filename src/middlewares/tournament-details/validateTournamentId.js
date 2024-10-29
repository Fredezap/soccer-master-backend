import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_TOURNAMENT_ID } = errorCodes.tournamentErrors

const validateTournamentId = check('tournamentDetailsId', INVALID_TOURNAMENT_ID)
    .exists().isNumeric()

export default validateTournamentId
import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import { tournamentConstants } from '../../constants/tournament/tournamentConstants.js'

const { TOURNAMENT_MIN_NAME_LENGTH, TOURNAMENT_MAX_NAME_LENGTH } = tournamentConstants
const { INVALID_TOURNAMENT_NAME, TOURNAMENT_NAME_TOO_LONG, TOURNAMENT_NAME_TOO_SHORT } = errorCodes.tournamentErrors

const validateTournamentName = check('name', INVALID_TOURNAMENT_NAME)
    .optional({ checkFalsy: true })
    .isString().withMessage(INVALID_TOURNAMENT_NAME)
    .bail()
    .isLength({ min: TOURNAMENT_MIN_NAME_LENGTH }).withMessage(TOURNAMENT_NAME_TOO_SHORT)
    .isLength({ max: TOURNAMENT_MAX_NAME_LENGTH }).withMessage(TOURNAMENT_NAME_TOO_LONG)

export default validateTournamentName
import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_TOURNAMENT_DATE, TOURNAMENT_DATE_IS_MANDATORY, TOURNAMENT_DATE_MUST_BE_FUTURE } = errorCodes.tournamentErrors

const validateTournamentDate = check('date', TOURNAMENT_DATE_IS_MANDATORY)
    .exists()
    .isISO8601().withMessage(INVALID_TOURNAMENT_DATE)
    .toDate()
    .custom(value => {
        const today = new Date()
        if (value <= today) {
            throw new Error(TOURNAMENT_DATE_MUST_BE_FUTURE)
        }
        return true
    })

export default validateTournamentDate
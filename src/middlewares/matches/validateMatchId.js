import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_MATCH_ID } = errorCodes.matchErrors

const validateMatchId = check('matchId', INVALID_MATCH_ID)
    .exists()
    .bail()
    .isNumeric()

export default validateMatchId
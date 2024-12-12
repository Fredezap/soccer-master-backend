import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_TEAM_SCORE } = errorCodes.teamErrors

const validateTeamScore = (fieldName) =>
    check(fieldName, INVALID_TEAM_SCORE)
        .optional({ checkFalsy: true })
        .isNumeric()

export default validateTeamScore
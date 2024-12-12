import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_TEAM_PLACEHOLDER } = errorCodes.teamErrors

const validateTeamPlaceholder = (fieldName) =>
    check(fieldName, INVALID_TEAM_PLACEHOLDER)
        .exists()
        .isString()

export default validateTeamPlaceholder
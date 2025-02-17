import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_TEAM_ID } = errorCodes.teamErrors

const validateTeamId = (fieldName) =>
    check(fieldName, INVALID_TEAM_ID)
        .exists()
        .bail()
        .isNumeric()

export default validateTeamId
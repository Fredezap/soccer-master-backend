import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import { teamsConstants } from '../../constants/teams/teamsConstants.js'

const { MIN_NAME_LENGTH, MAX_NAME_LENGTH } = teamsConstants
const { TEAM_NAME_TOO_LONG, TEAM_NAME_TOO_SHORT, INVALID_TEAM_NAME } = errorCodes.teamErrors

const validateTeamName = check('name', INVALID_TEAM_NAME)
    .isString().withMessage(INVALID_TEAM_NAME)
    .bail()
    .isLength({ min: MIN_NAME_LENGTH }).withMessage(TEAM_NAME_TOO_SHORT)
    .isLength({ max: MAX_NAME_LENGTH }).withMessage(TEAM_NAME_TOO_LONG)

export default validateTeamName
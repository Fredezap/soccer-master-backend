import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_TEAM_ID } = errorCodes.teamErrors

const validateTeamId = check('teamId', INVALID_TEAM_ID)
    .exists()
    .isNumeric()

export default validateTeamId
import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_TEAMS_IDS_SELECTED } = errorCodes.groupErrors

const validateTeamsIds = check('selectedTeamIds', INVALID_TEAMS_IDS_SELECTED)
    .exists()
    .isArray()
    .bail()
    .custom((id) => id.every(Number.isInteger))

export default validateTeamsIds
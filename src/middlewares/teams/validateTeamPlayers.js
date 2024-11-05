import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_PLAYERS_LIST } = errorCodes.teamErrors

const validateTeamPlayers = check('players', INVALID_PLAYERS_LIST)
    .optional()
    .isArray()
    .withMessage(INVALID_PLAYERS_LIST)

export default validateTeamPlayers
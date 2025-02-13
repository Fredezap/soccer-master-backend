import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_PLAYERS_LIST } = errorCodes.teamErrors

const validateTeamPlayers = check('players', INVALID_PLAYERS_LIST)
    .custom((value, { req }) => {
        if (Array.isArray(req.body.players)) {
            return true
        }

        if (typeof req.body.players === 'string') {
            try {
                const playersToArray = JSON.parse(req.body.players)
                if (Array.isArray(playersToArray)) {
                    req.body.players = playersToArray
                    return true
                }
            } catch (error) {
                throw new Error(INVALID_PLAYERS_LIST)
            }
        }

        throw new Error(INVALID_PLAYERS_LIST)
    })

export default validateTeamPlayers
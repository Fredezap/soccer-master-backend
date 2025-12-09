import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import playerService from '../../services/players/common/playerService.js'

const { SELECTED_PLAYER_NOT_FOUND } = errorCodes.teamErrors
const { TOURNAMENT_NOT_FOUNDED } = errorCodes.tournamentErrors

const validatePlayerExist = check('playerId', SELECTED_PLAYER_NOT_FOUND)
    .exists().bail().isNumeric().bail()
    .custom(async(playerId, { req }) => {
        const tournamentId = req.body.tournamentId

        if (!tournamentId) {
            throw new Error(TOURNAMENT_NOT_FOUNDED)
        }

        const playerExist = await playerService.findOneByTournamentAndPlayerId(playerId, tournamentId)

        if (!playerExist) {
            throw new Error(SELECTED_PLAYER_NOT_FOUND)
        }
        return true
    })

export default validatePlayerExist
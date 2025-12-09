import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import playerService from '../../services/players/common/playerService.js'

const { SELECTED_PLAYER_NOT_FOUND } = errorCodes.teamErrors
const { TOURNAMENT_NOT_FOUNDED } = errorCodes.tournamentErrors

const validatePlayerExist = check('playerId', SELECTED_PLAYER_NOT_FOUND)
    .exists().bail().isNumeric().bail()
    .custom(async(playerId, { req }) => {
        const tournamentId = req.body.tournamentId
        console.log('torneo y player: ', playerId, tournamentId)
        if (!tournamentId) {
            console.log('EROR?')
            throw new Error(TOURNAMENT_NOT_FOUNDED)
        }
        console.log('por entrar a player exist: ')
        const playerExist = await playerService.findOneByTournamentAndPlayerId(playerId, tournamentId)
        console.log('ERROR EN PLAYER: ', playerExist)
        if (!playerExist) {
            throw new Error(SELECTED_PLAYER_NOT_FOUND)
        }
        return true
    })

export default validatePlayerExist
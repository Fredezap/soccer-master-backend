import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentService from '../../services/tournaments/common/tournamentService.js'

const { INVALID_TOURNAMENT_ID, TOURNAMENT_NOT_FOUNDED } = errorCodes.tournamentErrors

const validateTournamentExist = check('tournamentId', INVALID_TOURNAMENT_ID)
    .exists().bail().isNumeric().bail()
    .custom(async(tournamentId, { req }) => {
        console.log('LLEGO ACA')
        const existingTournament = await tournamentService.findOneById(tournamentId)
        // console.log(existingTournament)
        if (!existingTournament) {
            throw new Error(TOURNAMENT_NOT_FOUNDED)
        }
        req.body.tournament = existingTournament
        return true
    })

export default validateTournamentExist
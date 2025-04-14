import express from 'express'
import getTournamentDetails from '../services/tournaments/getTournamentDetails.js'
import getAllTournaments from '../services/tournaments/getAllTournaments.js'
import validateTournamentExist from '../middlewares/tournament-details/validateTournamentExist.js'
import runValidations from '../middlewares/common/validations/runValidations.js'

const publicTournamentRouter = express.Router()

export default publicTournamentRouter

const runValidateTournament = runValidations([
    validateTournamentExist
])

publicTournamentRouter.post('/get-details',
    runValidateTournament,
    getTournamentDetails
)

publicTournamentRouter.post('/get-all',
    getAllTournaments
)
import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateTournamentName from '../middlewares/tournament-details/validateTournamentName.js'
import validateTournamentDate from '../middlewares/tournament-details/validateTournamentDate.js'
import { createTournamentDate } from '../services/tournament-details/createTournamentDate.js'
import getTournamentDetails from '../services/tournament-details/getTournamentDetails.js'

const tournamentDateRouter = express.Router()

const runTournamentStartingTimeRouter = runValidations([
    validateTournamentName,
    validateTournamentDate
])

tournamentDateRouter.post('/create',
    runTournamentStartingTimeRouter,
    createTournamentDate
)

// todo: create update endpoint
// tournamentDateRouter.patch('/update'
// )

tournamentDateRouter.post('/get-details',
    getTournamentDetails
)

export default tournamentDateRouter
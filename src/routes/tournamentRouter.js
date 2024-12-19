import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateTournamentName from '../middlewares/tournament-details/validateTournamentName.js'
import validateTournamentDate from '../middlewares/tournament-details/validateTournamentDate.js'
import { createTournament } from '../services/tournaments/createTournament.js'
import getTournamentDetails from '../services/tournaments/getTournamentDetails.js'
import updateTournamentDetails from '../services/tournaments/updateTournament.js'
import validateTournamentExist from '../middlewares/tournament-details/validateTournamentExist.js'
import getAllTournaments from '../services/tournaments/getAllTournaments.js'

const tournamentRouter = express.Router()

const runCreateValidations = runValidations([
    validateTournamentName,
    validateTournamentDate
])

const runUpdateValidations = runValidations([
    validateTournamentName,
    validateTournamentDate,
    validateTournamentExist
])

tournamentRouter.post('/create',
    runCreateValidations,
    createTournament
)

tournamentRouter.patch('/update',
    runUpdateValidations,
    updateTournamentDetails
)

tournamentRouter.post('/get-details',
    getTournamentDetails
)

tournamentRouter.post('/get-all',
    getAllTournaments
)

export default tournamentRouter
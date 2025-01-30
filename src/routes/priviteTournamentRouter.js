import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateTournamentName from '../middlewares/tournament-details/validateTournamentName.js'
import validateTournamentDate from '../middlewares/tournament-details/validateTournamentDate.js'
import { createTournament } from '../services/tournaments/createTournament.js'
import updateTournamentDetails from '../services/tournaments/updateTournament.js'
import validateTournamentExist from '../middlewares/tournament-details/validateTournamentExist.js'

const priviteTournamentRouter = express.Router()

const runCreateValidations = runValidations([
    validateTournamentName,
    validateTournamentDate
])

const runUpdateValidations = runValidations([
    validateTournamentName,
    validateTournamentDate,
    validateTournamentExist
])

priviteTournamentRouter.post('/create',
    runCreateValidations,
    createTournament
)

priviteTournamentRouter.patch('/update',
    runUpdateValidations,
    updateTournamentDetails
)

export default priviteTournamentRouter
import express from 'express'
import validateTournamentExist from '../middlewares/tournament-details/validateTournamentExist.js'
import runValidations from '../middlewares/common/validations/runValidations.js'
import getAllKnockoutStagesByTournament from '../services/fixture/stages/getAllKnockoutStagesByTournament.js'

const publicStagesRouter = express.Router()

export default publicStagesRouter

const runValidateTournament = runValidations([
    validateTournamentExist
])

publicStagesRouter.post('/get-all-knockout-stages-by-tournament',
    runValidateTournament,
    getAllKnockoutStagesByTournament
)
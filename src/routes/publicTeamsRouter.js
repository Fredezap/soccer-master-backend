import express from 'express'
import validateTournamentExist from '../middlewares/tournament-details/validateTournamentExist.js'
import runValidations from '../middlewares/common/validations/runValidations.js'
import getAllTeamsByTournamentId from '../services/teams/getAllTeamsByTournamentId.js'

const publicTeamsRouter = express.Router()

export default publicTeamsRouter

const runValidateTournament = runValidations([
    validateTournamentExist
])

publicTeamsRouter.post('/get-by-tournament',
    runValidateTournament,
    getAllTeamsByTournamentId
)
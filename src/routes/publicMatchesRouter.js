import express from 'express'
import validateTournamentExist from '../middlewares/tournament-details/validateTournamentExist.js'
import runValidations from '../middlewares/common/validations/runValidations.js'
import getAllMatches from '../services/fixture/matches/getAllMatches.js'

const publicMatchesRouter = express.Router()

export default publicMatchesRouter

publicMatchesRouter.post('/get-all',
    getAllMatches
)
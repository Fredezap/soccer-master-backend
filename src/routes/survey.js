import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validatePlayerExist from '../middlewares/teams/validatePlayerExist.js'
import GetUserIp from '../middlewares/common/getUserIp.js'
import CreateSurveyVote from '../services/survey/createSurveyVote.js'
import validateTournamentExist from '../middlewares/tournament-details/validateTournamentExist.js'
import GetVotesByTournament from '../services/survey/getVotesByTournament.js'
import validateSurveyAvailability from '../middlewares/survey/validateSurveyAvailability.js'
import updateSurveyAvaliability from '../services/survey/updateSurveyAvaliability.js'
import printRequest from '../utils/printRequest.js'
import createMVPSurvey from '../services/survey/createMVPSurvey.js'
import validateSurveyExist from '../middlewares/survey/validateSurveyExist.js'
import updateSurveyShowMVP from '../services/survey/updateSurveyShowMVP.js'

const surveyRouter = express.Router()

const runValidateSurveyData = runValidations([
    validateTournamentExist,
    validatePlayerExist
])

const runValidateTournamentExist = runValidations([
    validateTournamentExist
])

const runValidateSurveyAvailability = runValidations([
    validateSurveyAvailability
])

const runValidateSurveyExist = runValidations([
    validateSurveyExist
])

surveyRouter.post('/create',
    runValidateSurveyData,
    GetUserIp,
    CreateSurveyVote
)

surveyRouter.post('/get-votes',
    runValidateTournamentExist,
    GetVotesByTournament
)

surveyRouter.patch('/update-survey-availability',
    printRequest,
    runValidateSurveyAvailability,
    updateSurveyAvaliability
)

surveyRouter.patch('/update-mvp-survey',
    runValidateSurveyExist,
    updateSurveyShowMVP
)

surveyRouter.post('/create-mvp-survey',
    runValidateTournamentExist,
    createMVPSurvey
)

export default surveyRouter
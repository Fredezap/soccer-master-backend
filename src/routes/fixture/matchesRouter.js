import express from 'express'
import runValidations from '../../middlewares/common/validations/runValidations.js'
import getAllMatches from '../../services/fixture/matches/getAllMatches.js'
import validateTeamId from '../../middlewares/teams/validateTeamId.js'
import validateGroupId from '../../middlewares/groups/validateGroupId.js'
import createMatch from '../../services/fixture/matches/createMatch.js'
import checkIfTeamsExistInSameGroup from '../../middlewares/matches/checkIfTeamsExistInSameGroup.js'
import validateStageId from '../../middlewares/stages/validateStageId.js'
import checkIfStageExistById from '../../middlewares/stages/checkIfStageExistById.js'
import checkDate from '../../middlewares/matches/checkDate.js'
import checkTime from '../../middlewares/matches/checkTime.js'
import validateMatchId from '../../middlewares/matches/validateMatchId.js'
import validateMatchExist from '../../middlewares/matches/validateMatchExist.js'
import deleteMatch from '../../services/fixture/matches/deleteMatch.js'
import validateTeamPlaceholder from '../../middlewares/teams/validateTeamPlaceholder.js'
import checkIfMatchAlreadyExistCreateKnownTeams from '../../middlewares/matches/checkIfMatchAlreadyExistCreateKnownTeams.js'
import checkIfMatchAlreadyExistCreateUnknownTeams from '../../middlewares/matches/checkIfMatchAlreadyExistCreateUnknownTeams.js'
import checkLocation from '../../middlewares/matches/checkLocation.js'
import editMatch from '../../services/fixture/matches/editMatch.js'
import validateTeamScore from '../../middlewares/matches/validateTeamScore.js'
import validateTeamIdDoNotExist from '../../middlewares/teams/validateTeamIdDoNotExist.js'
import checkIfMatchExist from '../../middlewares/matches/checkIfMatchExist.js'

const matchesRouter = express.Router()

const runValidateCreateGroupMatchData = runValidations([
    validateTeamId('localTeamId'),
    validateTeamId('visitorTeamId'),
    validateGroupId,
    validateStageId,
    checkIfStageExistById,
    checkDate,
    checkTime,
    checkLocation
])

const runValidateKnockoutMatchKnownTeams = runValidations([
    validateTeamId('localTeamId'),
    validateTeamId('visitorTeamId'),
    validateStageId,
    checkIfStageExistById,
    checkDate,
    checkTime,
    checkLocation
])

const runValidateKnockoutMatchKnownTeamsEdit = runValidations([
    validateTeamId('localTeamId'),
    validateTeamId('visitorTeamId'),
    validateTeamScore('localTeamScore'),
    validateTeamScore('visitorTeamScore'),
    validateTeamScore('localTeamPenaltyScore'),
    validateTeamScore('visitorTeamPenaltyScore'),
    validateStageId,
    checkIfStageExistById,
    validateMatchId,
    validateMatchExist,
    checkDate,
    checkTime,
    checkLocation
])

const runValidateGroupMatcEdit = runValidations([
    validateTeamId('localTeamId'),
    validateTeamId('visitorTeamId'),
    validateTeamScore('localTeamScore'),
    validateTeamScore('visitorTeamScore'),
    validateTeamScore('localTeamPenaltyScore'),
    validateTeamScore('visitorTeamPenaltyScore'),
    validateGroupId,
    validateStageId,
    checkIfStageExistById,
    validateMatchId,
    validateMatchExist,
    checkDate,
    checkTime,
    checkLocation
])

const runValidateKnockoutMatchUnknownTeamsEdit = runValidations([
    validateTeamIdDoNotExist('localTeamId'),
    validateTeamIdDoNotExist('visitorTeamId'),
    validateTeamScore('localTeamScore'),
    validateTeamScore('visitorTeamScore'),
    validateTeamScore('localTeamPenaltyScore'),
    validateTeamScore('visitorTeamPenaltyScore'),
    validateStageId,
    checkIfStageExistById,
    validateMatchId,
    validateMatchExist,
    checkDate,
    checkTime,
    checkLocation
])

const runValidateKnockoutMatchUnknownTeams = runValidations([
    validateTeamPlaceholder('localTeamPlaceholder'),
    validateTeamPlaceholder('visitorTeamPlaceholder'),
    validateStageId,
    checkIfStageExistById,
    checkDate,
    checkTime,
    checkLocation
])

const runValidateMatch = runValidations([
    validateMatchId,
    validateMatchExist
])

matchesRouter.post('/create-group-match',
    runValidateCreateGroupMatchData,
    checkIfTeamsExistInSameGroup,
    checkIfMatchAlreadyExistCreateKnownTeams,
    createMatch
)

matchesRouter.post('/create-knockout-match-known-teams',
    runValidateKnockoutMatchKnownTeams,
    checkIfMatchAlreadyExistCreateKnownTeams,
    createMatch
)

matchesRouter.post('/create-knockout-match-unknown-teams',
    runValidateKnockoutMatchUnknownTeams,
    checkIfMatchAlreadyExistCreateUnknownTeams,
    createMatch
)

matchesRouter.post('/edit-known-teams',
    runValidateKnockoutMatchKnownTeamsEdit,
    editMatch
)

matchesRouter.post('/edit-group-match',
    runValidateGroupMatcEdit,
    editMatch
)

matchesRouter.post('/edit-unknown-teams',
    runValidateKnockoutMatchUnknownTeamsEdit,
    editMatch
)

matchesRouter.post('/delete',
    runValidateMatch,
    deleteMatch
)

matchesRouter.post('/get-all',
    getAllMatches
)

export default matchesRouter
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
import checkIfMatchAlreadyExistKnownTeams from '../../middlewares/matches/checkIfMatchAlreadyExistKnownTeams.js'
import checkIfMatchAlreadyExistUnknownTeams from '../../middlewares/matches/checkIfMatchAlreadyExistUnknownTeams.js'
import checkLocation from '../../middlewares/matches/checkLocation.js'
import editMatch from '../../services/fixture/matches/editMatch.js'
import validateTeamScore from '../../middlewares/matches/validateTeamScore.js'
import validateTeamIdDoNotExist from '../../middlewares/teams/validateTeamIdDoNotExist.js'

const matchesRouter = express.Router()

const runValidateCreateGroupMatchData = runValidations([
    validateTeamId('localTeamId'),
    validateTeamId('visitorTeamId'),
    validateGroupId,
    validateStageId,
    checkIfStageExistById,
    checkDate,
    checkTime
])

const p = (req, res, next) => {
    console.log(req.body)
    req.body.localTeamId = 22
    next()
}

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
    runValidateKnockoutMatchKnownTeams,
    createMatch
)

matchesRouter.post('/create-knockout-match-known-teams',
    runValidateKnockoutMatchKnownTeams,
    checkIfMatchAlreadyExistKnownTeams,
    createMatch
)

matchesRouter.post('/create-knockout-match-unknown-teams',
    runValidateKnockoutMatchUnknownTeams,
    checkIfMatchAlreadyExistUnknownTeams,
    createMatch
)

matchesRouter.post('/edit-known-teams',
    runValidateKnockoutMatchKnownTeamsEdit,
    checkIfMatchAlreadyExistKnownTeams,
    editMatch
)

matchesRouter.post('/edit-unknown-teams',
    runValidateKnockoutMatchUnknownTeamsEdit,
    checkIfMatchAlreadyExistKnownTeams,
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
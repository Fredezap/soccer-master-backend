import express from 'express'
import runValidations from '../../middlewares/common/validations/runValidations.js'
import getAllMatches from '../../services/fixture/matches/getAllMatches.js'
import validateTeamId from '../../middlewares/teams/validateTeamId.js'
import validateGroupId from '../../middlewares/groups/validateGroupId.js'
import checkIfMatchAlreadyExist from '../../middlewares/matches/checkIfMatchAlreadyExist.js'
import createMatch from '../../services/fixture/matches/createMatch.js'
import checkIfTeamsExistInSameGroup from '../../middlewares/matches/checkIfTeamsExistInSameGroup.js'
import validateStageId from '../../middlewares/stages/validateStageId.js'
import checkIfStageExistById from '../../middlewares/stages/checkIfStageExistById.js'
import checkDate from '../../middlewares/matches/checkDate.js'
import checkTime from '../../middlewares/matches/checkTime.js'
import validateMatchId from '../../middlewares/matches/validateMatchId.js'
import validateMatchExist from '../../middlewares/matches/validateMatchExist.js'
import deleteMatch from '../../services/fixture/matches/deleteMatch.js'

const matchesRouter = express.Router()

const runValidateCreateData = runValidations([
    validateTeamId('localTeamId'),
    validateTeamId('visitorTeamId'),
    validateGroupId,
    validateStageId,
    checkIfStageExistById,
    checkDate,
    checkTime
])

const runValidateMatch = runValidations([
    validateMatchId,
    validateMatchExist
])

matchesRouter.post('/create',
    runValidateCreateData,
    checkIfTeamsExistInSameGroup,
    checkIfMatchAlreadyExist,
    createMatch
)

matchesRouter.post('/delete',
    runValidateMatch,
    deleteMatch
)

matchesRouter.post('/get-all',
    getAllMatches
)

export default matchesRouter
import express from 'express'
import getAllStages from '../../services/fixture/stages/getAllStages.js'
import validateStageName from '../../middlewares/stages/validateStageName.js'
import validateStageType from '../../middlewares/stages/validateStageType.js'
import runValidations from '../../middlewares/common/validations/runValidations.js'
import createStage from '../../services/fixture/stages/createStage.js'
import capitalizeStageName from '../../middlewares/stages/capitalizeStageName.js'
import validateStageOrder from '../../middlewares/stages/validateStageOrder.js'
import checkIfStageNameAlreadyExist from '../../middlewares/stages/checkIfStageNameAlreadyExist.js'
import checkIfStageOrderAlreadyExist from '../../middlewares/stages/checkIfStageOrderAlreadyExist.js'
import validateStageId from '../../middlewares/stages/validateStageId.js'
import checkIfStageExistById from '../../middlewares/stages/checkIfStageExistById.js'
import deleteStage from '../../services/fixture/stages/deleteStage.js'
import getAllKnockoutStagesWithTeams from '../../services/fixture/stages/getAllKnockoutStagesWithTeams.js'

const stagesRouter = express.Router()

const runValidateStageValues = runValidations([
    validateStageName,
    validateStageType,
    validateStageOrder
])

const runValidateStageExist = runValidations([
    checkIfStageNameAlreadyExist,
    checkIfStageOrderAlreadyExist
])

const runValidateStageId = runValidations([
    validateStageId
])

const runValidateStageExistbyId = runValidations([
    checkIfStageExistById
])

stagesRouter.post('/create',
    runValidateStageValues,
    capitalizeStageName,
    runValidateStageExist,
    createStage
)

stagesRouter.post('/delete',
    runValidateStageId,
    runValidateStageExistbyId,
    deleteStage
)

stagesRouter.post('/get-all',
    getAllStages
)

stagesRouter.post('/get-all-knockout-stages',
    getAllKnockoutStagesWithTeams
)

export default stagesRouter
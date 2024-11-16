import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import stageService from '../../services/fixture/stages/common/stageService.js'

const { STAGE_ORDER_ALREADY_EXISTS } = errorCodes.stageErrors

const checkIfStageOrderAlreadyExist = check('order')
    .custom(async(order) => {
        const existingStage = await stageService.getOneByOrder(order)
        if (existingStage) {
            throw new Error(STAGE_ORDER_ALREADY_EXISTS)
        }
    })

export default checkIfStageOrderAlreadyExist
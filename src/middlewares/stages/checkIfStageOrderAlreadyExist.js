import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import stageService from '../../services/fixture/stages/common/stageService.js'

const { STAGE_ORDER_ALREADY_EXISTS } = errorCodes.stageErrors

const checkIfStageOrderAlreadyExist = check('order')
    .custom(async(order, { req }) => {
        const { tournamentId } = req.body
        const existingStage = await stageService.getOneByOrder(order, tournamentId)
        if (existingStage) {
            throw new Error(STAGE_ORDER_ALREADY_EXISTS)
        }
    })

export default checkIfStageOrderAlreadyExist
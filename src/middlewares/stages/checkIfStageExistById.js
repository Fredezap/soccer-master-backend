import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import stageService from '../../services/fixture/stages/common/stageService.js'

const { SELECTED_STAGE_DOES_NOT_EXIST } = errorCodes.stageErrors

const checkIfStageExistById = check('stageId')
    .custom(async(stageId) => {
        const existingStage = await stageService.getOneById(stageId)

        if (!existingStage) {
            throw new Error(SELECTED_STAGE_DOES_NOT_EXIST)
        }
    })

export default checkIfStageExistById
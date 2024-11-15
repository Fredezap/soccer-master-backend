import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import stageService from '../../services/fixture/stages/common/stageService.js'

const { STAGE_NAME_ALREADY_EXISTS } = errorCodes.stageErrors

const checkIfStageNameAlreadyExist = check('name')
    .custom(async(name) => {
        const existingStage = await stageService.getOneByName(name)
        if (existingStage) {
            throw new Error(STAGE_NAME_ALREADY_EXISTS)
        }
    })

export default checkIfStageNameAlreadyExist
import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import stageService from '../../services/fixture/stages/common/stageService.js'

const { STAGE_NAME_ALREADY_EXISTS } = errorCodes.stageErrors

const checkIfStageNameAlreadyExist = check('name')
    .custom(async(name, { req }) => {
        const { tournamentId } = req.body
        const existingStage = await stageService.getOneByName(name, tournamentId)
        if (existingStage) {
            throw new Error(STAGE_NAME_ALREADY_EXISTS)
        }
    })

export default checkIfStageNameAlreadyExist
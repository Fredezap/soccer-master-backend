import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import StagesConstants from '../../constants/stages/stagesConstansts.js'

const { INVALID_STAGE_TYPE } = errorCodes.stageErrors

const validateStageType = check('type', INVALID_STAGE_TYPE)
    .isString()
    .isIn([StagesConstants.GROUP, StagesConstants.KNOCKOUT])

export default validateStageType
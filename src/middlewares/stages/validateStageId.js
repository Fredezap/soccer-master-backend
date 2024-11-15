import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_STAGE_ID } = errorCodes.stageErrors

const validateStageId = check('stageId', INVALID_STAGE_ID)
    .exists()
    .isNumeric()

export default validateStageId
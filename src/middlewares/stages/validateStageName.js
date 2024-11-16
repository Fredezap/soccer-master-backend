import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_STAGE_NAME } = errorCodes.stageErrors

const validateStageName = check('name', INVALID_STAGE_NAME)
    .isString().withMessage(INVALID_STAGE_NAME)

export default validateStageName
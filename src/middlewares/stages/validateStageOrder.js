import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_STAGE_ORDER } = errorCodes.stageErrors

const validateStageOrder = check('order', INVALID_STAGE_ORDER)
    .isNumeric().withMessage(INVALID_STAGE_ORDER)

export default validateStageOrder
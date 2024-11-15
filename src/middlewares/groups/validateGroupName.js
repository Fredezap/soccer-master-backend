import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_GROUP_NAME } = errorCodes.groupErrors

const validateGroupName = check('name', INVALID_GROUP_NAME)
    .isString().withMessage(INVALID_GROUP_NAME)

export default validateGroupName
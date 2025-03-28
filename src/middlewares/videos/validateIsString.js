import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_STRING_VALUE, A_REQUIRED_VALUE_NOT_EXIST } = errorCodes.videoErrors

const validateIsString = (fieldName) =>
    check(fieldName)
        .exists().withMessage(A_REQUIRED_VALUE_NOT_EXIST)
        .bail()
        .isString().withMessage(INVALID_STRING_VALUE)

export default validateIsString
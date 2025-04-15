import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { NAME_IS_REQUIRED, NAME_MUST_BE_AT_LEAST_3_CHARACTERS_LONG } = errorCodes.emailErrors

const validateEmailUserName = check('userName', NAME_IS_REQUIRED)
    .exists({ checkFalsy: true }).withMessage(NAME_IS_REQUIRED)
    .bail()
    .isString().withMessage(NAME_IS_REQUIRED)
    .bail()
    .isLength({ min: 3 }).withMessage(NAME_MUST_BE_AT_LEAST_3_CHARACTERS_LONG)

export default validateEmailUserName
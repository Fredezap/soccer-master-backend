import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { NACHNAME_IS_REQUIRED, NACHNAME_MUST_BE_AT_LEAST_3_CHARACTERS_LONG } = errorCodes.contactErrors

const validateEmailUserSurname = check('userNachname', NACHNAME_IS_REQUIRED)
    .exists({ checkFalsy: true }).withMessage(NACHNAME_IS_REQUIRED)
    .bail()
    .isString().withMessage(NACHNAME_IS_REQUIRED)
    .bail()
    .isLength({ min: 3 }).withMessage(NACHNAME_MUST_BE_AT_LEAST_3_CHARACTERS_LONG)

export default validateEmailUserSurname
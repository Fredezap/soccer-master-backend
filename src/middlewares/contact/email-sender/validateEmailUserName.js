import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { VORNAME_IS_REQUIRED, VORNAME_MUST_BE_AT_LEAST_3_CHARACTERS_LONG } = errorCodes.contactErrors

const validateEmailUserName = check('userVorname', VORNAME_IS_REQUIRED)
    .exists({ checkFalsy: true }).withMessage(VORNAME_IS_REQUIRED)
    .bail()
    .isString().withMessage(VORNAME_IS_REQUIRED)
    .bail()
    .isLength({ min: 3 }).withMessage(VORNAME_MUST_BE_AT_LEAST_3_CHARACTERS_LONG)

export default validateEmailUserName
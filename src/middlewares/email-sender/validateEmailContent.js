import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { EMAIL_MESSAGE_IS_REQUIRED, EMAIL_MASSAGE_TOO_LONG } = errorCodes.emailErrors

const validateEmailContent = check('emailContent', EMAIL_MESSAGE_IS_REQUIRED)
    .exists({ checkFalsy: true }).withMessage(EMAIL_MESSAGE_IS_REQUIRED)
    .bail()
    .isString().withMessage(EMAIL_MESSAGE_IS_REQUIRED)
    .bail()
    .isLength({ max: 2000 }).withMessage(EMAIL_MASSAGE_TOO_LONG)

export default validateEmailContent
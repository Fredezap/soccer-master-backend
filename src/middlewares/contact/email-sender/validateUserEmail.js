import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { EMAIL_IS_REQUIRED, INVALID_EMAIL } = errorCodes.contactErrors

const validateUserEmail = check('userEmail')
    .exists({ checkFalsy: true }).withMessage(EMAIL_IS_REQUIRED)
    .bail()
    .isString().withMessage(EMAIL_IS_REQUIRED)
    .bail()
    .custom((value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
            throw new Error(INVALID_EMAIL)
        }
        return true
    })

export default validateUserEmail
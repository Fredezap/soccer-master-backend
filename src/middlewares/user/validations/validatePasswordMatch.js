import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'
const { CONFIRM_PASSWORD_IS_REQUIRED, PASSWORD_AND_CONFIRM_PASSWORD_DO_NOT_MATCH } = errorCodes.OAuthErrors

const validatePasswordMatch = check('confirmationPassword')
    .exists()
    .withMessage(CONFIRM_PASSWORD_IS_REQUIRED)
    .bail()
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error(PASSWORD_AND_CONFIRM_PASSWORD_DO_NOT_MATCH)
        }
        return true
    })

export default validatePasswordMatch
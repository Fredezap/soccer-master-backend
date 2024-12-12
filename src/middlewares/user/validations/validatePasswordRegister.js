import { check } from 'express-validator'
import { userConstants } from '../../../constants/user/userConstants.js'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { MIN_PASSWORD_LENGTH } = userConstants
const { PASSWORD_NOT_VALID, PASSWORD_INVALID_LENGTH } = errorCodes.OAuthErrors

const validatePasswordRegister = check('password', PASSWORD_NOT_VALID)
    .isString()
    .bail()
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(`${PASSWORD_INVALID_LENGTH}`)
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'i')
    .withMessage(PASSWORD_NOT_VALID)

export default validatePasswordRegister
import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { userConstants } from '../../../constants/user/userConstants.js'
const { ROLES } = userConstants
const { INVALID_CREDENTIALS_PLEASE_LOGIN } = errorCodes.OAuthErrors

const validateRole = check('role')
    .exists().withMessage(INVALID_CREDENTIALS_PLEASE_LOGIN)
    .bail()
    .isString().withMessage(INVALID_CREDENTIALS_PLEASE_LOGIN)
    .bail()
    .isIn(Object.values(ROLES)).withMessage(INVALID_CREDENTIALS_PLEASE_LOGIN)

export default validateRole
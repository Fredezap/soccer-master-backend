import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { userConstants } from '../../../constants/user/userConstants.js'
const { ROLES } = userConstants
const { USER_ROLE_IS_NOT_DEFINED } = errorCodes.OAuthErrors

const validateRole = check('role')
    .exists().withMessage('Role is required')
    .bail()
    .isString().withMessage('Role must be a string')
    .bail()
    .isIn(Object.values(ROLES)).withMessage('Invalid role')

export default validateRole
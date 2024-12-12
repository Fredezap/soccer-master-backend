import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { userConstants } from '../../../constants/user/userConstants.js'
const { ROLES } = userConstants
const { USER_ROLE_IS_NOT_DEFINED } = errorCodes.OAuthErrors

const validateRole = check('role', USER_ROLE_IS_NOT_DEFINED).exists().bail().isString().bail().isIn(Object.values(ROLES))

export default validateRole
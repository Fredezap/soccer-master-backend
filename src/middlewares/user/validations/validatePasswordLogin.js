import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { PASSWORD_NOT_VALID } = errorCodes.OAuthErrors

const validatePasswordLogin = check('password', PASSWORD_NOT_VALID)
    .exists()
    .bail()
    .isString()

export default validatePasswordLogin
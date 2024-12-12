import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { EMAIL_NOT_VALID } = errorCodes.OAuthErrors

const validateEmailFormat = check('email', EMAIL_NOT_VALID).exists().bail().isEmail()

export default validateEmailFormat
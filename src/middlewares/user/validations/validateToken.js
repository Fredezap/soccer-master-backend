import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { INVALID_CREDENTIALS } = errorCodes.OAuthErrors

const validateToken = check('token', INVALID_CREDENTIALS).exists().bail().isString().bail().isLength({ min: 20 })

export default validateToken
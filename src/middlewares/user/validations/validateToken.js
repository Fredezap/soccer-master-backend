import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'
const { INVALID_CREDENTIALS_PLEASE_LOGIN } = errorCodes.OAuthErrors

const validateToken = check('authorization')
    .exists().withMessage(INVALID_CREDENTIALS_PLEASE_LOGIN)
    .bail()
    .isString().withMessage(INVALID_CREDENTIALS_PLEASE_LOGIN)
    .bail()
    .isLength({ min: 20 }).withMessage(INVALID_CREDENTIALS_PLEASE_LOGIN)

export default validateToken
import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'
const { INVALID_USER } = errorCodes.OAuthErrors

const validateUserId = check('userId')
    .exists().withMessage(INVALID_USER)
    .bail()
    .toInt().withMessage(INVALID_USER)
    .bail()
    .isInt().withMessage(INVALID_USER)

export default validateUserId
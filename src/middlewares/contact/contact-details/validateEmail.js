import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { INVALID_EMAIL_FORMAT } = errorCodes.contactErrors

const validateEmail = check('contactEmail')
    .optional({ checkFalsy: true })
    .isEmail().withMessage(INVALID_EMAIL_FORMAT)

export default validateEmail
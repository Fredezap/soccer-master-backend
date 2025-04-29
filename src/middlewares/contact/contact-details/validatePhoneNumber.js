import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { INVALID_PHONE_NUMBER } = errorCodes.contactErrors

const validatePhoneNumber = check('contactPhone')
    .optional({ checkFalsy: true })
    .matches(/^\+[0-9\s]+$/)
    .withMessage(INVALID_PHONE_NUMBER)
    .bail()

export default validatePhoneNumber
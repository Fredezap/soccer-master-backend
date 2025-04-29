import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { SUBJECT_IS_REQUIRED } = errorCodes.contactErrors

const validateEmailSubject = check('emailSubject', SUBJECT_IS_REQUIRED)
    .exists({ checkFalsy: true }).withMessage(SUBJECT_IS_REQUIRED)
    .bail()
    .isString().withMessage(SUBJECT_IS_REQUIRED)

export default validateEmailSubject
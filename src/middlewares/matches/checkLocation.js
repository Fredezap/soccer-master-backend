import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_LOCATION } = errorCodes.matchErrors

const checkLocation = check('location', INVALID_LOCATION)
    .exists()
    .bail()
    .isString()

export default checkLocation
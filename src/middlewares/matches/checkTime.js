import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_TIME } = errorCodes.matchErrors

const checkTime = check('time', INVALID_TIME)
    .exists()
    .bail()
    .isTime()

export default checkTime
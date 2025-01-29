import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_TIME } = errorCodes.matchErrors

const checkTime = check('time', INVALID_TIME)
    .exists()
    .bail()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)

export default checkTime
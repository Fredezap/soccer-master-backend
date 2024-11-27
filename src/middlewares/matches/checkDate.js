import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_DATE } = errorCodes.matchErrors

const checkDate = check('date', INVALID_DATE)
    .exists()
    .bail()
    .isISO8601()
    .toDate()
    .bail()
    .custom((date) => {
        const currentDate = new Date()
        if (date <= currentDate) {
            throw new Error(INVALID_DATE)
        }
        return true
    })

export default checkDate
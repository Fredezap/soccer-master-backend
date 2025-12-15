import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_DATE } = errorCodes.matchErrors

const normalizeDate = (d) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate())

const checkDatePlusPastDate = check('date', INVALID_DATE)
    .exists()
    .bail()
    .isISO8601()
    .toDate()
    .bail()
    .custom((date) => {
        const inputDate = normalizeDate(date)
        const today = normalizeDate(new Date())

        if (inputDate < today) {
            throw new Error(INVALID_DATE)
        }

        return true
    })

export default checkDatePlusPastDate
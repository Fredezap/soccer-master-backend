import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
const { INVALID_CREDENTIALS } = errorCodes.admin

const adminCredentials = check('adminCredentials')
    .custom(value => {
        if (value === undefined) {
            throw new Error(INVALID_CREDENTIALS)
        }
        if (value === process.env.ADMIN_CREDENTIALS) {
            return true
        }
        throw new Error(INVALID_CREDENTIALS)
    })

export default adminCredentials
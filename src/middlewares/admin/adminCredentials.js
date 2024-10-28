import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
const { ADMIN_CREDENTIALS } = process.env
const { INVALID_CREDENTIALS } = errorCodes.admin

const adminCredentials = check('adminCredentials')
    .custom(value => {
        console.log('chequeando credentials')
        if (value === undefined) {
            console.log('Estaban undefined')
            throw new Error(INVALID_CREDENTIALS)
        }
        if (value === ADMIN_CREDENTIALS) {
            console.log('estaban ok')
            return true
        }
        console.log('no estaban ok, supongo no coincidian')
        throw new Error(INVALID_CREDENTIALS)
    })

export default adminCredentials
import errorCodes from '../../../constants/errors/errorCodes.js'
import verifyUserToken from './verifyUserToken.js'
import { checkTokenAndRoleDb } from './checkTokenAndRoleDb.js'
import { StatusCodes } from 'http-status-codes'
const { INVALID_CREDENTIALS } = errorCodes.OAuthErrors

const checkAdminCredentials = async(req, res, next) => {
    try {
        await verifyUserToken(req, res, next)
        await checkTokenAndRoleDb(req, res, next)
        return true
    } catch (err) {
        const errors = [{ msg: INVALID_CREDENTIALS }]
        return res.status(StatusCodes.UNAUTHORIZED).json({ errors })
    }
}

export default checkAdminCredentials
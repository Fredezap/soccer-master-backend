import userService from '../../../services/users/common/userService.js'
import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { INVALID_CREDENTIALS } = errorCodes.OAuthErrors

export const checkTokenAndRoleDb = async(req, res, next) => {
    const { email, token, role } = req.body
    const userDb = await userService.findByEmail(email)
    if (userDb && userDb.token === token && userDb.role === role) {
        return next()
    }

    const errors = [{ msg: INVALID_CREDENTIALS }]
    return res.status(StatusCodes.UNAUTHORIZED).json({ errors })
}
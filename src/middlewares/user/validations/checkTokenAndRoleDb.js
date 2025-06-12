import userService from '../../../services/users/common/userService.js'
import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { INVALID_CREDENTIALS } = errorCodes.OAuthErrors

export const checkTokenAndRoleDb = async(req, res, next) => {
    const { userId, token, role } = req.body
    const userDb = await userService.findById(userId)

    if (userDb && userDb.token === token && userDb.role === role && userDb.userId === userId) {
        return next()
    }

    const errors = [{ msg: INVALID_CREDENTIALS }]
    return res.status(StatusCodes.UNAUTHORIZED).json({ errors })
}
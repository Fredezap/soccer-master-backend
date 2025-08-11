import { check } from 'express-validator'
import userService from '../../../services/users/common/userService.js'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { userConstants } from '../../../constants/user/userConstants.js'

const { USER_NOT_FOUND, USER_REGISTRATION_NOT_ALLOWED } = errorCodes.OAuthErrors
const { SUPERADMIN } = userConstants.ROLES

const validateSuperAdmin = check('userId', USER_NOT_FOUND).custom(
    async(userId, { req }) => {
        const userDb = await userService.findById(userId)

        if (!userDb) return Promise.reject(new Error(USER_NOT_FOUND))

        if (userDb.role && userDb.role === SUPERADMIN) {
            req.body.userDb = userDb
            return Promise.resolve()
        }

        return Promise.reject(new Error(USER_REGISTRATION_NOT_ALLOWED))
    }
)

export default validateSuperAdmin
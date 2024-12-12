import { check } from 'express-validator'
import userService from '../../../services/users/common/userService.js'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { ADMIN_USER_NOT_FOUND } = errorCodes.OAuthErrors

const validateAdminExist = check('email', ADMIN_USER_NOT_FOUND).custom(
    async(email, { req }) => {
        const userDb = await userService.findByEmail(email)

        if (userDb) {
            req.body.userDb = userDb
            return Promise.resolve()
        }

        return Promise.reject(new Error(ADMIN_USER_NOT_FOUND))
    }
)

export default validateAdminExist
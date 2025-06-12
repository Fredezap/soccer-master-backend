import { check } from 'express-validator'
import userService from '../../../services/users/common/userService.js'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { USER_NOT_FOUND } = errorCodes.OAuthErrors

const validateUserExistByEmail = check('email', USER_NOT_FOUND).custom(
    async(email, { req }) => {
        const userDb = await userService.findByEmail(email)

        if (userDb) {
            req.body.userDb = userDb
            return Promise.resolve()
        }

        return Promise.reject(new Error(USER_NOT_FOUND))
    }
)

export default validateUserExistByEmail
import { check } from 'express-validator'
import userService from '../../../services/users/common/userService.js'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { USER_EMAIL_ALREADY_REGISTRATED, EMAIL_NOT_VALID } = errorCodes.OAuthErrors

const validateUserNotExistByEmail = check('email', EMAIL_NOT_VALID).custom(
    async(email, { req }) => {
        const userDb = await userService.findByEmail(email)

        if (!userDb) {
            return Promise.resolve()
        }

        return Promise.reject(new Error(USER_EMAIL_ALREADY_REGISTRATED))
    }
)

export default validateUserNotExistByEmail
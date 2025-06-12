import { check } from 'express-validator'
import userService from '../../../services/users/common/userService.js'
import errorCodes from '../../../constants/errors/errorCodes.js'

const { USER_NOT_FOUND } = errorCodes.OAuthErrors

const validateUserExistById = check('userId', USER_NOT_FOUND).custom(
    async(userId, { req }) => {
        const userDb = await userService.findById(userId)

        if (userDb) {
            req.body.userDb = userDb
            return Promise.resolve()
        }

        return Promise.reject(new Error(USER_NOT_FOUND))
    }
)

export default validateUserExistById
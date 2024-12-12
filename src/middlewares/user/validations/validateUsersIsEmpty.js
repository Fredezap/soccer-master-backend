import { check } from 'express-validator'
import userService from '../../../services/users/common/userService.js'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { StatusCodes } from 'http-status-codes'

const { USER_REGISTRATION_NOT_ALLOWED } = errorCodes.OAuthErrors

const validateUsersIsEmpty = async(req, res, next) => {
    const usersIsEmpty = await userService.checkUsersIsEmpty()

    if (usersIsEmpty) {
        return next()
    }
    const errors = [{ msg: USER_REGISTRATION_NOT_ALLOWED }]
    res.status(StatusCodes.BAD_REQUEST).json({ errors })
}

export default validateUsersIsEmpty
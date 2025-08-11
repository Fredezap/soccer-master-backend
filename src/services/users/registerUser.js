import { StatusCodes } from 'http-status-codes'
import userService from './common/userService.js'
import errorCodes from '../../constants/errors/errorCodes.js'
import { userConstants } from '../../constants/user/userConstants.js'

const { ERROR_WHILE_CREATING_USER } = errorCodes.OAuthErrors
const registerUser = async(req, res) => {
    try {
        const { email, password, token } = req.body
        const role = userConstants.ROLES.ADMIN
        const values = { role, email, password, token }
        await userService.registerUser(values)
        return res.status(StatusCodes.OK).send()
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_CREATING_USER }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default registerUser
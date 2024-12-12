import { StatusCodes } from 'http-status-codes'
import userService from './common/userService.js'
import errorCodes from '../../constants/errors/errorCodes.js'

const { ERROR_WHILE_CREATING_USER } = errorCodes.OAuthErrors
const registerUser = async(req, res) => {
    try {
        await userService.registerUser(req.body)
        return res.status(StatusCodes.OK).send()
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_CREATING_USER }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default registerUser
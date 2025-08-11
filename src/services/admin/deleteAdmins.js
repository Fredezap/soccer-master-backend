import { StatusCodes } from 'http-status-codes'
import { userConstants } from '../../constants/user/userConstants.js'
import userService from '../users/common/userService.js'
import errorCodes from '../../constants/errors/errorCodes.js'

const deleteAdmins = async(req, res) => {
    const { AN_ERROR_OCURRED_WHILE_DELETING_ADMIN_USERS } = errorCodes.OAuthErrors

    try {
        const { adminUsersId } = req.body
        await userService.destroyMany(adminUsersId)
        return res.status(StatusCodes.OK).json({})
    } catch (err) {
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_DELETING_ADMIN_USERS }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default deleteAdmins
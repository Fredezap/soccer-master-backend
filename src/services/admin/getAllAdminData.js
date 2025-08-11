import { StatusCodes } from 'http-status-codes'
import { userConstants } from '../../constants/user/userConstants.js'
import userService from '../users/common/userService.js'
import errorCodes from '../../constants/errors/errorCodes.js'

const getAllAdminUsersData = async(req, res) => {
    const { AN_ERROR_OCURRED_WHILE_GETTING_ADMIN_USERS_DATA } = errorCodes.OAuthErrors

    try {
        const { role } = req.body
        const { ROLES } = userConstants
        let existingAdminUsers = null

        if (role === ROLES.SUPERADMIN) {
            existingAdminUsers = await userService.findAllByRole(ROLES.ADMIN)
            return res.status(StatusCodes.CREATED).json({ existingAdminUsers })
        }

        return res.status(StatusCodes.CREATED).json({ existingAdminUsers })
    } catch (err) {
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_GETTING_ADMIN_USERS_DATA }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default getAllAdminUsersData
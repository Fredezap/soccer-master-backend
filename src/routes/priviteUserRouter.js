import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateSuperAdmin from '../middlewares/user/validations/validateSuperAdmin.js'
import getAllAdminUsersData from '../services/admin/getAllAdminData.js'
import validateEmailFormat from '../middlewares/user/validations/validateEmailFormat.js'
import validateUserNotExistByEmail from '../middlewares/user/validations/validateUserNotExistByEmail.js'
import validatePasswordRegister from '../middlewares/user/validations/validatePasswordRegister.js'
import validatePasswordMatch from '../middlewares/user/validations/validatePasswordMatch.js'
import { hashPassword } from '../middlewares/user/OAuth/bcrypt.js'
import registerUser from '../services/users/registerUser.js'
import deleteAdmins from '../services/admin/deleteAdmins.js'
import validateArrayIds from '../middlewares/common/validateArrayIds.js'

const priviteUserRouter = express.Router()

const validateSuperAdminCredentials = runValidations([
    validateSuperAdmin
])

const validateAdminArrayToDelete = (req, res, next) => {
    validateArrayIds(req.body.adminUsersId, req, res, next)
}

const registerValidations = runValidations([
    validateEmailFormat,
    validateUserNotExistByEmail,
    validatePasswordRegister,
    validatePasswordMatch
])

priviteUserRouter.post('/register-admins', validateSuperAdminCredentials, registerValidations, hashPassword, registerUser)
priviteUserRouter.post('/get-all-admins', validateSuperAdminCredentials, getAllAdminUsersData)
priviteUserRouter.post('/delete-admins', validateSuperAdminCredentials, validateAdminArrayToDelete, deleteAdmins)

export default priviteUserRouter
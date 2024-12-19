import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateAdminExist from '../middlewares/user/validations/validateAdminExist.js'
import { generateJWTToken } from '../middlewares/user/OAuth/jwt.js'
import validateEmailFormat from '../middlewares/user/validations/validateEmailFormat.js'
import validateUsersIsEmpty from '../middlewares/user/validations/validateUsersIsEmpty.js'
import { hashPassword, checkPassword } from '../middlewares/user/OAuth/bcrypt.js'
import registerUser from '../services/users/registerUser.js'
import validatePasswordMatch from '../middlewares/user/validations/validatePasswordMatch.js'
import validatePasswordLogin from '../middlewares/user/validations/validatePasswordLogin.js'
import validatePasswordRegister from '../middlewares/user/validations/validatePasswordRegister.js'

const authRouter = express.Router()

const runLoginValidations = runValidations([
    validateEmailFormat,
    validatePasswordLogin,
    validateAdminExist
])

const registerValidations = runValidations([
    validateEmailFormat,
    validatePasswordRegister,
    validatePasswordMatch
])

authRouter.post('/login', runLoginValidations, checkPassword, generateJWTToken)
authRouter.post('/register', registerValidations, validateUsersIsEmpty, hashPassword, registerUser)

export default authRouter
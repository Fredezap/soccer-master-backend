import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateUserExist from '../middlewares/user/validations/validateUserExistById.js'
import { generateJWTToken } from '../middlewares/user/OAuth/jwt.js'
import validateEmailFormat from '../middlewares/user/validations/validateEmailFormat.js'
import { hashPassword, checkPassword } from '../middlewares/user/OAuth/bcrypt.js'
import registerUser from '../services/users/registerUser.js'
import validatePasswordMatch from '../middlewares/user/validations/validatePasswordMatch.js'
import validatePasswordLogin from '../middlewares/user/validations/validatePasswordLogin.js'
import validatePasswordRegister from '../middlewares/user/validations/validatePasswordRegister.js'
import validateUserExistByEmail from '../middlewares/user/validations/validateUserExistByEmail.js'

const authRouter = express.Router()

const runLoginValidations = runValidations([
    validateEmailFormat,
    validatePasswordLogin,
    validateUserExistByEmail
])

const registerValidations = runValidations([
    validateEmailFormat,
    validatePasswordRegister,
    validatePasswordMatch
])

authRouter.post('/login', runLoginValidations, checkPassword, generateJWTToken)
authRouter.post('/register', registerValidations, hashPassword, registerUser)

export default authRouter
import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import { generateJWTToken } from '../middlewares/user/OAuth/jwt.js'
import validateEmailFormat from '../middlewares/user/validations/validateEmailFormat.js'
import { checkPassword } from '../middlewares/user/OAuth/bcrypt.js'
import validatePasswordLogin from '../middlewares/user/validations/validatePasswordLogin.js'
import validateUserExistByEmail from '../middlewares/user/validations/validateUserExistByEmail.js'

const authRouter = express.Router()

const runLoginValidations = runValidations([
    validateEmailFormat,
    validatePasswordLogin,
    validateUserExistByEmail
])

authRouter.post('/login', runLoginValidations, checkPassword, generateJWTToken)

export default authRouter
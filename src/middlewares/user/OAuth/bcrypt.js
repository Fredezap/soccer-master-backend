import bcrypt from 'bcrypt'
import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'

// Password hashing middleware
const { SERVER_ERROR_PROCCESING_PASSWORD, INVALID_CREDENTIALS, SERVER_ERROR_CHECKING_CREDENTIALS } = errorCodes.OAuthErrors

export const hashPassword = async(req, res, next) => {
    const { password } = req.body
    try {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password, salt)
        delete req.body.confirmPassword
        req.body.password = hashedPassword
        next()
    } catch (error) {
        const errors = [{ msg: SERVER_ERROR_PROCCESING_PASSWORD }]
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

// Password verifying middleware
export const checkPassword = async(req, res, next) => {
    const { password: plainPassword, userDb: { password: DbHashedPassword } } = req.body
    try {
        const isMatch = await bcrypt.compare(plainPassword, DbHashedPassword)
        if (isMatch) {
            next()
        } else {
            const errors = [{ msg: INVALID_CREDENTIALS }]
            res.status(StatusCodes.UNAUTHORIZED).json({ errors })
        }
    } catch (error) {
        const errors = [{ msg: SERVER_ERROR_CHECKING_CREDENTIALS }]
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}
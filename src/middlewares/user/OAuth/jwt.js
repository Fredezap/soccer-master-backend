import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { StatusCodes } from 'http-status-codes'
import { promisify } from 'util'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { User } from '../../../models/userModel.js'

const signAsync = promisify(jwt.sign)
const verifyAsync = promisify(jwt.verify)
const secretKey = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex')

const {
    SERVER_ERROR_GENERATING_TOKEN,
    INVALID_CREDENTIALS,
    TOKEN_HAS_EXPIRED,
    UNKNOWN_ERROR_WHILE_VERIFYING_TOKEN
} = errorCodes.OAuthErrors

let errors

export const generateJWTToken = async(req, res, next) => {
    const { email, userDb } = req.body
    const payload = { email }

    try {
        const token = await signAsync(payload, secretKey, { expiresIn: '730h' })

        if (userDb instanceof User) {
            userDb.token = token
            await userDb.save()
        }

        const user = { token: userDb.token, role: userDb.role }
        return res.status(StatusCodes.OK).send(user)
    } catch (error) {
        errors = [{ msg: SERVER_ERROR_GENERATING_TOKEN }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export const verifyTokenJWT = async(token) => {
    try {
        const decoded = await verifyAsync(token, secretKey)
        return { success: true, decoded }
    } catch (err) {
        let errorMessage
        if (err instanceof jwt.TokenExpiredError) {
            errorMessage = TOKEN_HAS_EXPIRED
        } else if (err instanceof jwt.JsonWebTokenError) {
            errorMessage = INVALID_CREDENTIALS
        } else {
            errorMessage = UNKNOWN_ERROR_WHILE_VERIFYING_TOKEN
        }
        return { success: false, error: errorMessage }
    }
}
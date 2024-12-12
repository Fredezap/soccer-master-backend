import { verifyTokenJWT } from '../OAuth/jwt.js'
import { StatusCodes } from 'http-status-codes'

const verifyUserToken = async(req, res, next) => {
    try {
        const result = await verifyTokenJWT(req.body.token)
        if (result.success) {
            req.body.email = result.decoded.email
            return next()
        } else {
            throw new Error(result.error)
        }
    } catch (err) {
        const errors = [{ msg: err.message }]
        return res.status(StatusCodes.UNAUTHORIZED).json({ errors })
    }
}

export default verifyUserToken
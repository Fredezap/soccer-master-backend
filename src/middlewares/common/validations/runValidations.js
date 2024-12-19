import { validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

const runValidations = (validations) => async(req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() })
}

export default runValidations
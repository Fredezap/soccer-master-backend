import { validationResult } from 'express-validator'
import { StatusCodes } from 'http-status-codes'

const runValidations = (validations) => async(req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    const allErrors = errors.array()

    const uniqueErrors = allErrors.filter((err, index, self) =>
        index === self.findIndex(e => e.msg === err.msg)
    )

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: uniqueErrors })
}

export default runValidations
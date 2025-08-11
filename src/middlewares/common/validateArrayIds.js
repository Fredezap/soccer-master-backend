import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'

const validateArrayIds = (arrayIds, req, res, next) => {
    const { AN_ERROR_OCURRED_WITH_THE_ELEMENTS_YOU_HAVE_SELECTED } = errorCodes.OAuthErrors

    // Verificamos que sea un array no vacío y que todos sus elementos sean números válidos
    if (Array.isArray(arrayIds) && arrayIds.length > 0 && arrayIds.every(id => typeof id === 'number' && !isNaN(id))) {
        return next()
    }

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        errors: AN_ERROR_OCURRED_WITH_THE_ELEMENTS_YOU_HAVE_SELECTED
    })
}

export default validateArrayIds
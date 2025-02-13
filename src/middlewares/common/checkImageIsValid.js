import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import { isImage } from '../../middlewares/common/isImage.js'

const checkImageIsValid = (req, res, next) => {
    const { LOGO_IMAGE_NOT_VALID, ERROR_WHILE_CHECKING_LOGO_IMAGE } = errorCodes.teamErrors
    try {
        const file = req.files?.[0]
        req.file = file
        if (file) {
            if (file.fieldname === 'file' && file.mimetype) {
                const isImageValid = isImage(file)
                if (!isImageValid) {
                    const mimeType = file.mimetype
                    const type = mimeType.split('/')[1]
                    const errors = [{ msg: `${LOGO_IMAGE_NOT_VALID} (${type || mimeType})` }]
                    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
                }
            }
        }

        return next()
    } catch (error) {
        const errors = [{ msg: ERROR_WHILE_CHECKING_LOGO_IMAGE }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export default checkImageIsValid
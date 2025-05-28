import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import { isImage } from './isImage.js'

const checkMultipleImagesAreValid = (req, res, next) => {
    const { ERROR_WHILE_CHECKING_IMAGES, IMAGE_NOT_VALID } = errorCodes.teamErrors

    try {
        const { files } = req
        if (files && Array.isArray(files)) {
            const invalidFiles = files.filter(file => !isImage(file))

            if (invalidFiles.length > 0) {
                const errorList = invalidFiles.map(file => {
                    const mimeType = file.mimetype
                    const type = mimeType?.split('/')[1] || mimeType
                    return { msg: `${IMAGE_NOT_VALID} (${type})` }
                })

                return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errorList })
            }
        }

        return next()
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [{ msg: ERROR_WHILE_CHECKING_IMAGES }]
        })
    }
}

export default checkMultipleImagesAreValid
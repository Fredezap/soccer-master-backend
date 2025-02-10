import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import stageService from './common/stageService.js'

const { ERROR_WHILE_EDITING_STAGE } = errorCodes.stageErrors
const editStage = async(req, res) => {
    const values = req.body
    try {
        await stageService.edit({ values })
        return res.status(StatusCodes.OK).json()
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_EDITING_STAGE }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default editStage
import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import stageService from './common/stageService.js'

const { ERROR_WHILE_DELETING_STAGE } = errorCodes.stageErrors
const deleteStage = async(req, res) => {
    const { stageId } = req.body
    try {
        await stageService.destroy({ stageId })
        return res.status(StatusCodes.OK).json()
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_DELETING_STAGE }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default deleteStage
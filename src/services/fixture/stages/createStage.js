import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import stageService from './common/stageService.js'

const { ERROR_WHILE_CREATING_STAGE } = errorCodes.stageErrors
const createStage = async(req, res) => {
    try {
        await stageService.create(req.body)
        return res.status(StatusCodes.CREATED).json()
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_CREATING_STAGE }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default createStage
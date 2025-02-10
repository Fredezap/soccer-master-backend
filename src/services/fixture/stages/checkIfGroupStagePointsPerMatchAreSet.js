import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import stageService from './common/stageService.js'

const checkIfGroupStagePointsPerMatchAreSet = async(req, res, next) => {
    const { ERROR_WHILE_GETTING_STAGE_DATA } = errorCodes.stageErrors

    try {
        const { stageId } = req.body
        const response = await stageService.checkPointsPerMatchAreSet(stageId)

        if (response.success) {
            return next()
        } else {
            const errors = [{ msg: response.error }]
            return res.status(StatusCodes.NOT_FOUND).json({ errors })
        }
    } catch (error) {
        const errors = [{ msg: ERROR_WHILE_GETTING_STAGE_DATA }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export default checkIfGroupStagePointsPerMatchAreSet
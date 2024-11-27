import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import stageService from './common/stageService.js'

const getAllStages = async(req, res) => {
    const { ERROR_WHILE_GETTING_STAGES } = errorCodes.stageErrors
    try {
        const dbStages = await stageService.getAll()
        console.log('STAGES:', dbStages)
        return res.status(StatusCodes.OK).json({ dbStages })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_GETTING_STAGES }]
        console.log('STAGES ERROR:', err)
        return res.status(StatusCodes.NOT_FOUND).json({ errors })
    }
}

export default getAllStages
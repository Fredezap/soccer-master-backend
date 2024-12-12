import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import stageService from './common/stageService.js'

const getAllKnockoutStagesWithTeams = async(req, res) => {
    const { ERROR_WHILE_GETTING_STAGES } = errorCodes.stageErrors
    try {
        const dbKnockoutStages = await stageService.getKnockoutStagesWithTeams()
        return res.status(StatusCodes.OK).json({ dbKnockoutStages })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_GETTING_STAGES }]
        return res.status(StatusCodes.NOT_FOUND).json({ errors })
    }
}

export default getAllKnockoutStagesWithTeams
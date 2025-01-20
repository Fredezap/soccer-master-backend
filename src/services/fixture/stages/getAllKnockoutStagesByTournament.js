import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import stageService from './common/stageService.js'

const getAllKnockoutStagesByTournament = async(req, res) => {
    const { ERROR_WHILE_GETTING_KNOCKOUT_STAGES } = errorCodes.stageErrors
    try {
        const { tournamentId } = req.body
        const dbKnockoutStages = await stageService.getKnockoutStagesByTournament(tournamentId)
        return res.status(StatusCodes.OK).json({ dbKnockoutStages })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_GETTING_KNOCKOUT_STAGES }]
        return res.status(StatusCodes.NOT_FOUND).json({ errors })
    }
}

export default getAllKnockoutStagesByTournament
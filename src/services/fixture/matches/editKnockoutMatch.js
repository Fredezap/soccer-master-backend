import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import matchService from './common/matchService.js'

const {
    ERROR_WHILE_EDITING_MATCH
} = errorCodes.matchErrors

const editKnockoutMatch = async(req, res) => {
    const {
        matchId,
        localTeamId,
        visitorTeamId,
        stageId,
        localTeamPlaceholder,
        visitorTeamPlaceholder,
        date,
        time,
        location
    } = req.body

    const values = {
        matchId,
        localTeamId,
        visitorTeamId,
        stageId,
        localTeamPlaceholder,
        visitorTeamPlaceholder,
        date,
        time,
        location
    }

    try {
        await matchService.edit({ values })
        return res.status(StatusCodes.OK).json()
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_EDITING_MATCH }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default editKnockoutMatch
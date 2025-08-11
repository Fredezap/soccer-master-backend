import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import matchService from './common/matchService.js'

const { ERROR_WHILE_DELETING_MATCH, YOU_CAN_NOT_DELETE_A_MATCH_THAT_HAS_RESULT_DEFINED } = errorCodes.matchErrors
const deleteMatch = async(req, res) => {
    let errors
    try {
        const { matchId, match } = req.body
        const localTeamScore = match?.dataValues?.localTeamScore
        const visitorTeamScore = match.dataValues.visitorTeamScore

        // if Results are defined, return error to avoid changing team table scores
        if (localTeamScore !== null || visitorTeamScore !== null) {
            errors = [{ msg: YOU_CAN_NOT_DELETE_A_MATCH_THAT_HAS_RESULT_DEFINED }]
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
        }

        await matchService.destroy({ matchId })
        return res.status(StatusCodes.OK).json()
    } catch (err) {
        errors = [{ msg: ERROR_WHILE_DELETING_MATCH }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default deleteMatch
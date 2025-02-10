import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import matchService from './common/matchService.js'
const { ERROR_WHILE_EDITING_MATCH, YOU_CANNOT_EDIT_A_MATCH_THAT_HAS_RESULT_DEFINED } = errorCodes.matchErrors

const editGroupMatch = async(req, res) => {
    try {
        const {
            matchId,
            stageId,
            localTeamId,
            visitorTeamId,
            date,
            time,
            location
        } = req.body

        const values = {
            matchId,
            stageId,
            localTeamId,
            visitorTeamId,
            date,
            time,
            location
        }

        const existingMatch = await matchService.getOneById(matchId)

        const previousLocalScore = existingMatch?.localTeamScore
        const previousVisitorScore = existingMatch?.visitorTeamScore

        if (previousLocalScore || previousVisitorScore) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                errors: [{ msg: YOU_CANNOT_EDIT_A_MATCH_THAT_HAS_RESULT_DEFINED }]
            })
        }

        await matchService.edit({ values })
        return res.status(StatusCodes.OK).json()
    } catch (err) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: [{ msg: ERROR_WHILE_EDITING_MATCH }]
        })
    }
}

export default editGroupMatch
import { StatusCodes } from 'http-status-codes'
import matchService from '../../services/fixture/matches/common/matchService.js'
import errorCodes from '../../constants/errors/errorCodes.js'

const checkIfMatchAlreadyExistCreateUnknownTeams = async(req, res, next) => {
    const { THIS_MATCH_ALREADY_EXIST, ERROR_WHILE_CHECKING_MATCH_DATA } = errorCodes.matchErrors
    try {
        const { stageId, localTeamPlaceholder, visitorTeamPlaceholder, date, time, matchId } = req.body
        const result = await matchService.checkIfMatchExistsUnknownTeams(stageId, localTeamPlaceholder, visitorTeamPlaceholder, date, time)
        if (result.success) {
            if (matchId) {
                if (matchId === result.match?.matchId) return next()
            }
            const errors = [{ msg: THIS_MATCH_ALREADY_EXIST }]
            return res.status(StatusCodes.BAD_REQUEST).json({ errors })
        }
        next()
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_CHECKING_MATCH_DATA }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export default checkIfMatchAlreadyExistCreateUnknownTeams
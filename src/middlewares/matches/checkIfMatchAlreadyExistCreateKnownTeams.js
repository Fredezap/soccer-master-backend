import { StatusCodes } from 'http-status-codes'
import matchService from '../../services/fixture/matches/common/matchService.js'
import errorCodes from '../../constants/errors/errorCodes.js'

const checkIfMatchAlreadyExistCreateKnownTeams = async(req, res, next) => {
    const { THIS_MATCH_ALREADY_EXIST, ERROR_WHILE_CHECKING_MATCH_DATA } = errorCodes.matchErrors
    try {
        const { stageId, localTeamId, visitorTeamId, date, time } = req.body
        const result = await matchService.checkIfMatchExistsKnownTeams(stageId, localTeamId, visitorTeamId, date, time)
        if (result.success) {
            const errors = [{ msg: THIS_MATCH_ALREADY_EXIST }]
            return res.status(StatusCodes.BAD_REQUEST).json({ errors })
        }
        next()
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_CHECKING_MATCH_DATA }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export default checkIfMatchAlreadyExistCreateKnownTeams
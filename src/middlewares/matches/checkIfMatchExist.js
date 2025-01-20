import { StatusCodes } from 'http-status-codes'
import matchService from '../../services/fixture/matches/common/matchService.js'
import errorCodes from '../../constants/errors/errorCodes.js'

const checkIfMatchExist = async(req, res, next) => {
    const { THIS_MATCH_DO_NOT_EXIST, ERROR_WHILE_CHECKING_MATCH_DATA } = errorCodes.matchErrors
    try {
        const { matchId } = req.body
        const match = await matchService.getOneById(matchId)
        if (match) {
            return next()
        }
        const errors = [{ msg: THIS_MATCH_DO_NOT_EXIST }]
        return res.status(StatusCodes.BAD_REQUEST).json({ errors })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_CHECKING_MATCH_DATA }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export default checkIfMatchExist
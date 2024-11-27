import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import matchService from './common/matchService.js'

const { ERROR_WHILE_DELETING_MATCH } = errorCodes.matchErrors
const deleteMatch = async(req, res) => {
    const { matchId } = req.body
    try {
        await matchService.destroy({ matchId })
        return res.status(StatusCodes.OK).json()
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_DELETING_MATCH }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default deleteMatch
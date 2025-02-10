import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import matchService from './common/matchService.js'
const { ERROR_WHILE_EDITING_MATCH } = errorCodes.matchErrors

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

        await matchService.edit({ values })
        return res.status(StatusCodes.OK).json()
    } catch (err) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: [{ msg: ERROR_WHILE_EDITING_MATCH }]
        })
    }
}

export default editGroupMatch
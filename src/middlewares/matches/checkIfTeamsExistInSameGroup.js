import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import groupService from '../../services/fixture/groups/common/groupService.js'

const checkIfTeamsExistInSameGroup = async(req, res, next) => {
    const { ERROR_WHILE_VERIFYING_TEAMS } = errorCodes.groupErrors
    try {
        const { localTeamId, visitorTeamId, groupId } = req.body
        const result = await groupService.checkIfTeamsExistInSameGroup(localTeamId, visitorTeamId, groupId)
        if (!result.success) {
            const errors = [{ msg: ERROR_WHILE_VERIFYING_TEAMS }]
            return res.status(StatusCodes.NOT_FOUND).json({ errors })
        }
        next()
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_VERIFYING_TEAMS }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export default checkIfTeamsExistInSameGroup
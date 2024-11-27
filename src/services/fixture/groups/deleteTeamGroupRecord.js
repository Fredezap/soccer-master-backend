import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import groupService from './common/groupService.js'

const deleteTeamGroupRecord = async(req, res) => {
    const { ERROR_WHILE_DELETING_GROUP } = errorCodes.groupErrors
    try {
        const { groupId, teamId } = req.body

        const response = await groupService.deleteTeamGroupRecord(groupId, teamId)
        if (response.success) {
            return res.status(StatusCodes.OK).json({ success: true })
        } else {
            const errors = [{ msg: response.error }]
            return res.status(StatusCodes.NOT_FOUND).json({ errors })
        }
    } catch (error) {
        const errors = [{ msg: ERROR_WHILE_DELETING_GROUP }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export default deleteTeamGroupRecord
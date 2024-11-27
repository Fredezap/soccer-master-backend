import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import groupService from './common/groupService.js'

const updateGroupName = async(req, res) => {
    const { ERROR_WHILE_UPDATING_GROUP_NAME } = errorCodes.groupErrors
    try {
        const { groupId, name } = req.body

        await groupService.updateGroupName(groupId, name)
        return res.status(StatusCodes.OK).json({ success: true })
    } catch (error) {
        const errors = [{ msg: ERROR_WHILE_UPDATING_GROUP_NAME }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export default updateGroupName
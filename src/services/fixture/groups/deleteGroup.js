import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import groupService from './common/groupService.js'

const deleteGroup = async(req, res) => {
    const { ERROR_WHILE_DELETING_GROUP } = errorCodes.groupErrors
    try {
        const { groupId } = req.body

        await groupService.deleteGroup(groupId)
        return res.status(StatusCodes.OK).json({ success: true })
    } catch (error) {
        const errors = [{ msg: ERROR_WHILE_DELETING_GROUP }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export default deleteGroup
import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import groupService from './common/groupService.js'

const getAllGroups = async(req, res) => {
    const { ERROR_WHILE_GETTING_GROUPS } = errorCodes.groupErrors
    try {
        const dbGroups = await groupService.getAllGroupsWithTeams()
        console.log(dbGroups)
        return res.status(StatusCodes.OK).json({ dbGroups })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_GETTING_GROUPS }]
        return res.status(StatusCodes.NOT_FOUND).json({ errors })
    }
}

export default getAllGroups
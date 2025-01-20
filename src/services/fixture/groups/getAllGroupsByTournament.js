import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import groupService from './common/groupService.js'

const getAllGroupsByTournament = async(req, res) => {
    const { ERROR_WHILE_GETTING_GROUPS } = errorCodes.groupErrors
    const { tournamentId } = req.body
    try {
        const dbGroups = await groupService.getAllGroupsWithTeamsByTournament(tournamentId)
        return res.status(StatusCodes.OK).json({ dbGroups })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_GETTING_GROUPS }]
        return res.status(StatusCodes.NOT_FOUND).json({ errors })
    }
}

export default getAllGroupsByTournament
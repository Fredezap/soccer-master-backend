import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import teamService from './common/teamService.js'

const getAllTeams = async(req, res) => {
    const { ERROR_WHILE_GETTING_TEAMS } = errorCodes.teamErrors
    try {
        const dbTeams = await teamService.getAll()
        return res.status(StatusCodes.OK).json({ dbTeams })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_GETTING_TEAMS }]
        return res.status(StatusCodes.NOT_FOUND).json({ errors })
    }
}

export default getAllTeams
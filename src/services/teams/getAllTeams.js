import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import teamService from './common/teamService.js'

const getAllTeams = async(req, res) => {
    // console.log('en get all temas')
    const { ERROR_WHILE_GETTING_TEAMS } = errorCodes.teamErrors
    try {
        const dbTeams = await teamService.getAll()
        // console.log(dbTeams)
        return res.status(StatusCodes.OK).json({ dbTeams })
    } catch (err) {
        // console.log(err)
        const errors = [{ msg: ERROR_WHILE_GETTING_TEAMS }]
        return res.status(StatusCodes.NOT_FOUND).json({ errors })
    }
}

export default getAllTeams
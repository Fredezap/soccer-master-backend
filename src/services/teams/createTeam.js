import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import teamService from './common/teamService.js'

const { ERROR_WHILE_CREATING_TEAM } = errorCodes.teamErrors
const createTeam = async(req, res) => {
    try {
        const { tournamentId } = req.body
        await teamService.create(req.body)
        const dbTeams = await teamService.getAllByTournamentId(tournamentId)
        return res.status(StatusCodes.CREATED).json({ dbTeams })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_CREATING_TEAM }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default createTeam
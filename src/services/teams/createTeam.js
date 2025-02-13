import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import teamService from './common/teamService.js'

const { ERROR_WHILE_CREATING_TEAM, ERROR_WHILE_SAVING_IMAGE } = errorCodes.teamErrors
const createTeam = async(req, res) => {
    try {
        const { tournamentId } = req.body
        await teamService.create(req)
        const dbTeams = await teamService.getAllByTournamentId(tournamentId)
        return res.status(StatusCodes.CREATED).json({ dbTeams })
    } catch (err) {
        let errors = [{ msg: ERROR_WHILE_CREATING_TEAM }]
        if (err.message === ERROR_WHILE_SAVING_IMAGE) errors = [{ msg: ERROR_WHILE_SAVING_IMAGE }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default createTeam
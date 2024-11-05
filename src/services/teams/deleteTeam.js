import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import teamService from './common/teamService.js'

const { ERROR_WHILE_DELETING_TEAM } = errorCodes.teamErrors
const deleteTeam = async(req, res) => {
    const { teamId } = req.body.team
    try {
        await teamService.destroy({ teamId })
        return res.status(StatusCodes.OK).json()
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_DELETING_TEAM }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default deleteTeam
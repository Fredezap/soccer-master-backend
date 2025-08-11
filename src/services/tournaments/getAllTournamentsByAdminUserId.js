import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentService from './common/tournamentService.js'
import { userConstants } from '../../constants/user/userConstants.js'

const getAllTournamentsByAdminUserId = async(req, res) => {
    const { AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS } = errorCodes.tournamentErrors
    const { ROLES } = userConstants
    try {
        const { role, userId } = req.body
        let allUserTournaments

        if (role === ROLES.SUPERADMIN) { // If user is superadmin, we get all the tournaments
            allUserTournaments = await tournamentService.findAll()
        } else { // else we get just the tournaments that belongs to the specific admin.
            allUserTournaments = await tournamentService.findAllByUserId(userId)
        }

        return res.status(StatusCodes.OK).json({ allUserTournaments })
    } catch (err) {
        const errors = [{ msg: AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS }]
        return res.status(StatusCodes.NOT_FOUND).json({ errors })
    }
}

export default getAllTournamentsByAdminUserId
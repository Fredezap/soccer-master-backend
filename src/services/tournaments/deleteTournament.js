import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentService from './common/tournamentService.js'
import { checkExistingTournament } from './checkExistingTournament.js'
import validateTournamentNotExist from '../../middlewares/tournament-details/validateTournamentNotExist.js'

const { AN_ERROR_OCURRED_WHILE_DELETING_TOURNAMENT } = errorCodes.tournamentErrors
export const deleteTournament = async(req, res) => {
    try {
        const { tournamentId } = req.body

        await tournamentService.destroy({ tournamentId })

        return res.status(StatusCodes.CREATED).json()
    } catch (err) {
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_DELETING_TOURNAMENT }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default deleteTournament
import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentService from './common/tournamentService.js'
import validateTournamentNotExist from '../../middlewares/tournament-details/validateTournamentNotExist.js'

const { AN_ERROR_OCURRED_WHILE_CREATING_TOURNAMENT } = errorCodes.tournamentErrors
export const createTournament = async(req, res) => {
    try {
        const { date, name, tournamentId, tournamentLogo, mainBgImg } = req.body
        const { files } = req
        const values = { date, name, tournamentId, tournamentLogo, mainBgImg, files }

        const tournamentExistsError = await validateTournamentNotExist(name, date)

        if (tournamentExistsError) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: [{ msg: tournamentExistsError.message }] })
        }

        const tournamentDetails = await tournamentService.create(values)

        return res.status(StatusCodes.CREATED).json({ tournamentDetails })
    } catch (err) {
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_CREATING_TOURNAMENT }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}
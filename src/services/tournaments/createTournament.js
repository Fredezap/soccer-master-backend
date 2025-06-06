import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentService from './common/tournamentService.js'
import { checkExistingTournament } from './checkExistingTournament.js'
import validateTournamentNotExist from '../../middlewares/tournament-details/validateTournamentNotExist.js'

const { ERROR_WHILE_CREATING_TOURNAMENT_DATE } = errorCodes.tournamentErrors
export const createTournament = async(req, res) => {
    try {
        console.log('EN CREATE')
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
        const errors = [{ msg: ERROR_WHILE_CREATING_TOURNAMENT_DATE }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}
import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentDatailService from './common/tournamentDatailService.js'
import { checkExistingTournament } from './checkExistingTournament.js'

const { AN_ERROR_OCURRED_WHILE_CREATING_TOURNAMENT_DETAILS } = errorCodes.tournamentErrors
const createTournamentDetails = async(req, res) => {
    try {
        const tournamentExistsError = await checkExistingTournament(req.body.date, req.body.name)

        // Si se devuelve un error desde checkExistingTournament, devolverlo directamente
        if (tournamentExistsError) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: [{ msg: tournamentExistsError.message }] })
        }

        const tournamentDatails = await tournamentDatailService.create(req.body)
        return res.status(StatusCodes.CREATED).json({ tournamentDatails })
    } catch (err) {
        console.log('ERROR EN CREATE')
        console.log(err)
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_CREATING_TOURNAMENT_DETAILS }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default createTournamentDetails
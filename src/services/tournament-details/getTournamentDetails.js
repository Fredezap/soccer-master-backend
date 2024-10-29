import { StatusCodes } from 'http-status-codes'
import tournamentDatailService from './common/tournamentDatailService.js'
import errorCodes from '../../constants/errors/errorCodes.js'

const getTournamentDetails = async(req, res) => {
    const { AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS } = errorCodes.tournamentErrors
    try {
        console.log('por entrar a obtener detalles')
        const tournamentDetails = await tournamentDatailService.findOne()
        console.log('salio')
        console.log('TOURNAMENT DETAILS: ', tournamentDetails)
        return res.status(StatusCodes.OK).json({ tournamentDetails })
    } catch (err) {
        console.log('error al obtener detalles')
        console.log(err)
        const errors = [{ msg: AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS }]
        return res.status(StatusCodes.NOT_FOUND).json({ errors })
    }
}

export default getTournamentDetails
import { StatusCodes } from 'http-status-codes'
import tournamentService from './common/tournamentService.js'
import errorCodes from '../../constants/errors/errorCodes.js'

const getAllTournaments = async(req, res) => {
    const { AN_ERROR_OCURRED_WHILE_GETTING_TOURNAMENTS } = errorCodes.tournamentErrors
    try {
        const allTournaments = await tournamentService.findAll()
        return res.status(StatusCodes.OK).json({ allTournaments })
    } catch (err) {
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_GETTING_TOURNAMENTS }]
        return res.status(StatusCodes.NOT_FOUND).json({ errors })
    }
}

export default getAllTournaments
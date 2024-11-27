import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import matchService from './common/matchService.js'

const createMatch = async(req, res) => {
    console.log('EN CREATE MATCH')
    const { ERROR_WHILE_CREATING_MATCH } = errorCodes.matchErrors
    console.log('EN CREATE MATCH 2')
    try {
        console.log('EN CREATE MATCH 3')
        const a = await matchService.create(req.body)
        console.log('RESPUESTA DE CREACION', a)
        return res.status(StatusCodes.OK).json()
    } catch (err) {
        console.log('ERROR: ', err)
        const errors = [{ msg: ERROR_WHILE_CREATING_MATCH }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export default createMatch
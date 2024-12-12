import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import matchService from './common/matchService.js'

const createMatch = async(req, res) => {
    const { ERROR_WHILE_CREATING_MATCH } = errorCodes.matchErrors
    try {
        const a = await matchService.create(req.body)
        return res.status(StatusCodes.OK).json()
    } catch (err) {
        console.log(err)
        const errors = [{ msg: ERROR_WHILE_CREATING_MATCH }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export default createMatch
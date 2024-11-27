import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import matchService from './common/matchService.js'

const getAllMatches = async(req, res) => {
    console.log('en get all matches')
    const { ERROR_WHILE_GETTING_GROUPS } = errorCodes.groupErrors
    try {
        console.log('GET ALL matches')
        const dbMatches = await matchService.getAllMatchesByDate()
        console.log(dbMatches)
        return res.status(StatusCodes.OK).json({ dbMatches })
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_GETTING_GROUPS }]
        return res.status(StatusCodes.NOT_FOUND).json({ errors })
    }
}

export default getAllMatches
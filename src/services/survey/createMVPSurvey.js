import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import surveyService from './common/surveyService.js'

const { ERROR_WHILE_CREATING_SURVEY } = errorCodes.mvpErrors
const createMVPSurvey = async(req, res) => {
    try {
        const { tournamentId } = req.body
        if (tournamentId.MVPSurvey) {
            throw new Error(ERROR_WHILE_CREATING_SURVEY)
        }

        await surveyService.createMVPSurvey({ tournamentId })

        return res
            .status(StatusCodes.CREATED).json({})
    } catch (err) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: [{ msg: ERROR_WHILE_CREATING_SURVEY }] })
    }
}

export default createMVPSurvey
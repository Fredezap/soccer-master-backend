import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import surveyService from './common/surveyService.js'

const { ERROR_WHILE_UPDATING_SURVEY, NO_MVP_SET } = errorCodes.mvpErrors

const updateSurveyShowMVP = async(req, res) => {
    console.log('aca')

    const MVPSurvey = req.body.MVPSurvey
    const mvpSurveyId = MVPSurvey.mvpSurveyId
    const votingIsAvaliable = MVPSurvey.votingIsAvaliable || false
    const showMVP = MVPSurvey.showMVP
    const isThereMVP = MVPSurvey.playerId

    if (!isThereMVP) {
        return res.status(StatusCodes.BAD_REQUEST)
            .json({ errors: [{ msg: NO_MVP_SET }] })
    }

    const updatedFields = { showMVP, votingIsAvaliable }

    try {
        await surveyService.updateMVPSurvey(mvpSurveyId, { updatedFields })

        return res.status(StatusCodes.OK).json({})
    } catch (err) {
        console.log('ERROR:', err)

        return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json({ errors: [{ msg: ERROR_WHILE_UPDATING_SURVEY }] })
    }
}

export default updateSurveyShowMVP
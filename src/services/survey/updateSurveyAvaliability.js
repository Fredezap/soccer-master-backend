import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import surveyService from './common/surveyService.js'

const { ERROR_WHILE_UPDATING_SURVEY } = errorCodes.mvpErrors

const updateSurveyAvaliability = async(req, res) => {
    const MVPSurvey = req.body.MVPSurvey
    const mvpSurveyId = MVPSurvey.mvpSurveyId
    const votingIsAvaliable = MVPSurvey.votingIsAvaliable

    let updatedFields
    if (votingIsAvaliable) {
        const showMVP = MVPSurvey.showMVP || false
        updatedFields = { votingIsAvaliable, showMVP }
    }

    if (MVPSurvey.playerId) {
        updatedFields = { votingIsAvaliable, playerId: MVPSurvey.playerId }
    }
    try {
        await surveyService.updateMVPSurvey(mvpSurveyId, { updatedFields })

        return res.status(StatusCodes.OK).json({})
    } catch (err) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: [{ msg: ERROR_WHILE_UPDATING_SURVEY }] })
    }
}

export default updateSurveyAvaliability
import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import surveyService from './common/surveyService.js'

const { ERROR_WHILE_UPDATING_SURVEY } = errorCodes.mvpErrors

const updateSurveyAvaliability = async(req, res) => {
    const MVPSurvey = req.body.MVPSurvey

    const mvpSurveyId = MVPSurvey.mvpSurveyId
    const votingIsAvaliable = MVPSurvey.votingIsAvaliable
    const playerId = MVPSurvey.playerId
    const showMVP = MVPSurvey.showMVP || false

    let updatedFields = {}

    // Caso 1: votingIsAvaliable = false
    if (!votingIsAvaliable) {
        updatedFields = {
            votingIsAvaliable,
            showMVP
        }
    }

    // Caso 2: votingIsAvaliable = true y NO hay playerId
    if (votingIsAvaliable && !playerId) {
        updatedFields = {
            votingIsAvaliable
        }
    }

    // Caso 3: votingIsAvaliable = true y hay playerId
    if (!votingIsAvaliable && playerId) {
        updatedFields = {
            votingIsAvaliable,
            playerId
        }
    }

    // Caso 4: votingIsAvaliable = true y hay showMVP
    if (votingIsAvaliable) {
        updatedFields = {
            votingIsAvaliable,
            showMVP
        }
    }

    try {
        await surveyService.updateMVPSurvey(mvpSurveyId, { updatedFields })

        return res.status(StatusCodes.OK).json({})
    } catch (err) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: [{ msg: ERROR_WHILE_UPDATING_SURVEY }]
        })
    }
}

export default updateSurveyAvaliability
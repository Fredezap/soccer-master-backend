import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import surveyService from '../../services/survey/common/surveyService.js'

const { SURVEY_NOT_FOUND } = errorCodes.mvpErrors

const validateSurveyAvailability = check('MVPSurvey')
    .exists().bail()
    .custom(async(value, { req }) => {
        const MVPSurvey = value

        if (!MVPSurvey || !MVPSurvey.mvpSurveyId) {
            throw new Error(SURVEY_NOT_FOUND)
        }

        const dbMVPSurvey = await surveyService.findByIdMVPSurvey(
            MVPSurvey.mvpSurveyId
        )

        if (!dbMVPSurvey) {
            throw new Error(SURVEY_NOT_FOUND)
        }

        req.body.dbMVPSurvey = dbMVPSurvey

        return true
    })

export default validateSurveyAvailability
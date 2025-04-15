import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import updateEmails from '../services/email-sender/priviate/updateEmails.js'
import validateEmailsData from '../middlewares/email-sender/validateEmailsData.js'
import validateTournamentExist from '../middlewares/tournament-details/validateTournamentExist.js'
import sendEmailtoAdminEmails from '../services/email-sender/public/sendEmailtoAdminEmails.js'
import getAdminEmails from '../middlewares/email-sender/getAdminEmails.js'
import validateEmailContent from '../middlewares/email-sender/validateEmailContent.js'
import validateEmailSubject from '../middlewares/email-sender/validateEmailSubject.js'
import validateEmailUserName from '../middlewares/email-sender/validateEmailUserName.js'
import validateUserEmail from '../middlewares/email-sender/validateUserEmail.js'
import printRequest from '../utils/printRequest.js'

const publicEmailSenderRouter = express.Router()

const runValidateAdminEmails = runValidations([
    getAdminEmails
])

const runValidateEmailFields = runValidations([
    validateEmailContent,
    validateEmailSubject,
    validateEmailUserName,
    validateUserEmail
])

publicEmailSenderRouter.post('/send-email',
    printRequest,
    runValidateAdminEmails,
    runValidateEmailFields,
    sendEmailtoAdminEmails
)

export default publicEmailSenderRouter
import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import sendEmailtoAdminEmails from '../services/contact/public/sendEmailtoAdminEmails.js'
import getAdminEmails from '../middlewares/contact/email-sender/getAdminEmails.js'
import validateEmailContent from '../middlewares/contact/email-sender/validateEmailContent.js'
import validateEmailSubject from '../middlewares/contact/email-sender/validateEmailSubject.js'
import validateEmailUserName from '../middlewares/contact/email-sender/validateEmailUserName.js'
import validateUserEmail from '../middlewares/contact/email-sender/validateUserEmail.js'
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
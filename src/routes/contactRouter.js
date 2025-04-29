import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateEmailsData from '../middlewares/contact/email-sender/validateEmailsData.js'
import validateTournamentExist from '../middlewares/tournament-details/validateTournamentExist.js'
import printRequest from '../utils/printRequest.js'
import setContactDetails from '../services/contact/priviate/setContactDetails.js'
import setEmails from '../services/contact/priviate/setEmails.js'
import validatePhoneNumber from '../middlewares/contact/contact-details/validatePhoneNumber.js'
import validateEmail from '../middlewares/contact/contact-details/validateEmail.js'

const contactRouter = express.Router()

const runValidateTournament = runValidations([
    validateTournamentExist
])

const runValidateEmails = runValidations([
    validateEmailsData('newEmails'),
    validateEmailsData('removedEmails')
])

const runValidateContactDetails = runValidations([
    validatePhoneNumber,
    validateEmail
])

contactRouter.post('/set-emails',
    runValidateTournament,
    runValidateEmails,
    setEmails
)

contactRouter.post('/set-contact-details',
    printRequest,
    runValidateTournament,
    runValidateContactDetails,
    setContactDetails
)

export default contactRouter
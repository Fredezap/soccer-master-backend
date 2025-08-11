import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateEmailsData from '../middlewares/contact/email-sender/validateEmailsData.js'
import validateTournamentExist from '../middlewares/tournament-details/validateTournamentExist.js'
import setContactDetails from '../services/contact/priviate/setContactDetails.js'
import setEmails from '../services/contact/priviate/setEmails.js'
import validatePhoneNumber from '../middlewares/contact/contact-details/validatePhoneNumber.js'
import validateEmail from '../middlewares/contact/contact-details/validateEmail.js'
import setFooterContactDetails from '../services/contact/priviate/setFooterContactDetails.js'

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
    runValidateTournament,
    runValidateContactDetails,
    setContactDetails
)

contactRouter.post('/set-footer-contact-details',
    runValidateTournament,
    setFooterContactDetails
)

export default contactRouter
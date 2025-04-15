import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import updateEmails from '../services/email-sender/priviate/updateEmails.js'
import validateEmailsData from '../middlewares/email-sender/validateEmailsData.js'
import validateTournamentExist from '../middlewares/tournament-details/validateTournamentExist.js'

const emailSenderRouter = express.Router()

const runValidateTournament = runValidations([
    validateTournamentExist
])

const runValidateEmails = runValidations([
    validateEmailsData('newEmails'),
    validateEmailsData('removedEmails')
])

emailSenderRouter.post('/update-emails',
    runValidateTournament,
    runValidateEmails,
    updateEmails
)

export default emailSenderRouter
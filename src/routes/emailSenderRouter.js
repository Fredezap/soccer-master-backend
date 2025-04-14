import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import updateEmails from '../services/email-sender/updateEmails.js'
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

// TODO: Ver si hago aca el envio de emails que realizara el usuario.
// todo: tener en cuenta que esta ruta creo que es de admin, por lo tanto requiere de credenciales, el usuario no podria usarlas.
// todo: por lo tanto ver si lo dejo aca o si hago un enrutador publico para envio de mails o ver que se me ocurre.

export default emailSenderRouter
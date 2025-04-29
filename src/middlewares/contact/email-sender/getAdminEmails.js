import { check } from 'express-validator'
import errorCodes from '../../../constants/errors/errorCodes.js'
import emailSenderService from '../../../services/contact/common/emailSenderService.js'
import tournamentService from '../../../services/tournaments/common/tournamentService.js'

const { AN_ERROR_OCURRED_WHILE_SENDING_EMAIL } = errorCodes.contactErrors

const getAdminEmails = check('tournamentId')
    .exists()
    .withMessage(AN_ERROR_OCURRED_WHILE_SENDING_EMAIL)
    .bail()
    .isNumeric()
    .withMessage(AN_ERROR_OCURRED_WHILE_SENDING_EMAIL)
    .bail()
    .custom(async(tournamentId, { req }) => {
        const existingTournament = await tournamentService.findOneById(tournamentId)
        const adminAllowedEmails = await emailSenderService.findAllByTournament(tournamentId)
        if (!existingTournament || !adminAllowedEmails) {
            throw new Error(AN_ERROR_OCURRED_WHILE_SENDING_EMAIL)
        }
        req.body.adminAllowedEmails = adminAllowedEmails
    })

export default getAdminEmails
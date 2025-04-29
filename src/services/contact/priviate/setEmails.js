import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import emailSenderService from '../common/emailSenderService.js'
import tournamentService from '../../tournaments/common/tournamentService.js'

const { AN_ERROR_OCURRED_WHILE_UPDATING_EMAILS } = errorCodes.contactErrors

const setEmails = async(req, res) => {
    try {
        const { newEmails, removedEmails, tournamentId } = req.body

        if (Array.isArray(newEmails) && newEmails.length > 0) {
            const created = await emailSenderService.create(newEmails, tournamentId)
        }
        if (Array.isArray(removedEmails) && removedEmails.length > 0) {
            const emailIdsArray = removedEmails.map(email => email.emailId)
            const removed = await emailSenderService.destroy(emailIdsArray)
        }
        // const allTournaments = await tournamentService.findAll()
        return res.status(StatusCodes.OK).json({})
    } catch (err) {
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_UPDATING_EMAILS }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default setEmails
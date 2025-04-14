import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import emailSenderService from './common/emailSenderService.js'
import tournamentService from '../tournaments/common/tournamentService.js'

const { AN_ERROR_OCURRED_WHILE_UPDATING_EMAILS } = errorCodes.emailErrors
const updateEmails = async(req, res) => {
    try {
        const { newEmails, removedEmails, tournamentId } = req.body
        if (Array.isArray(newEmails) && newEmails.length > 0) {
            console.log('entro a crear')
            const created = await emailSenderService.create(newEmails, tournamentId)
            console.log('respuesta', created)
        }
        if (Array.isArray(removedEmails) && removedEmails.length > 0) {
            console.log('entro a eliminar')
            const emailIdsArray = removedEmails.map(email => email.emailId)
            const removed = await emailSenderService.destroy(emailIdsArray)
            console.log('respuesta', removed)
        }
        const allTournaments = await tournamentService.findAll()
        return res.status(StatusCodes.OK).json({ allTournaments })
    } catch (err) {
        console.log('ERROR', err)
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_UPDATING_EMAILS }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default updateEmails
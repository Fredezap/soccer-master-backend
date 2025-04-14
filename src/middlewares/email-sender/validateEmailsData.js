import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import emailSenderService from '../../services/email-sender/common/emailSenderService.js'

const { INVALID_EMAILS_LIST, INVALID_EMAIL_FORMAT, REMOVED_EMAILS_NOT_FOUND, SOME_EMAIL_ALREADY_EXIST } = errorCodes.emailErrors

// This function will check if email array is valid
const validateEmailsData = (fieldName) => {
    console.log(`ENTRO EN CUSTOM DE ${fieldName}`)
    return check(fieldName, INVALID_EMAILS_LIST)
        .exists().bail()
        .isArray().bail()
        .custom(async(value, { req }) => {
            console.log('elementos en el array: ', value.length)
            if (value.length > 0) {
                console.log('Mas de 0 elementos')
                // Get all the emails by tournament
                const existingEmails = await emailSenderService.findAllByTournament(req.body.tournamentId)
                // console.log('EXISTING EMAILS', existingEmails)

                for (const item of value) {
                    if (typeof item !== 'object' || !item.emailId || !item.email) {
                        throw new Error(INVALID_EMAILS_LIST)
                    }

                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    if (!emailRegex.test(item.email)) {
                        throw new Error(INVALID_EMAIL_FORMAT)
                    }
                }

                // New emails validation
                if (fieldName === 'newEmails') {
                    // Validate array data

                    // Get the new emails received from array
                    const emails = value.map(item => item.email)
                    console.log('emails', emails)

                    // Get the db emails
                    const existingEmailsSet = new Set(existingEmails.map(email => email.email))
                    console.log('existingEmailsSet', existingEmailsSet)

                    // Check if email already exist in db
                    const EmailAlreadyExist = emails.filter(email => existingEmailsSet.has(email))
                    console.log('EmailAlreadyExist', EmailAlreadyExist)

                    if (EmailAlreadyExist.length > 0) {
                        throw new Error(SOME_EMAIL_ALREADY_EXIST)
                    }
                }

                // Deleted emails validation
                if (fieldName === 'removedEmails') {
                    console.log('en removed')
                    // Validate array data
                    for (const item of value) {
                        try {
                            const intEmailId = parseInt(item.emailId)
                            console.log(intEmailId)
                            console.log(typeof intEmailId)
                            if (typeof intEmailId !== 'number') throw new Error(INVALID_EMAILS_LIST)
                        } catch (err) {
                            throw new Error(INVALID_EMAILS_LIST)
                        }
                    }
                    console.log('PASO')
                    // Get ids from db
                    const existingIdsSet = new Set(existingEmails.map(email => email.emailId))
                    console.log('existingIdsSet', existingIdsSet)

                    // Check if id exist in db to be deleted
                    const nonExistingIds = value.filter(item => !existingIdsSet.has(item.emailId))
                    console.log('nonExistingIds', nonExistingIds)

                    if (nonExistingIds.length > 0) {
                        throw new Error(REMOVED_EMAILS_NOT_FOUND)
                    }
                }
                console.log('Salio del primer true')
                return true
            }
            console.log('Salio del SEGUNDO true')
            return true
        })
}

export default validateEmailsData
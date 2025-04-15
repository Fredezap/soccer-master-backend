import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import emailSenderService from '../../services/email-sender/common/emailSenderService.js'

const { INVALID_EMAILS_LIST, INVALID_EMAIL_FORMAT, REMOVED_EMAILS_NOT_FOUND, SOME_EMAIL_ALREADY_EXIST } = errorCodes.emailErrors

// This function will check if email array is valid
const validateEmailsData = (fieldName) => {
    return check(fieldName, INVALID_EMAILS_LIST)
        .exists().bail()
        .isArray().bail()
        .custom(async(value, { req }) => {
            if (value.length > 0) {
                // Get all the emails by tournament
                const existingEmails = await emailSenderService.findAllByTournament(req.body.tournamentId)

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

                    // Get the db emails
                    const existingEmailsSet = new Set(existingEmails.map(email => email.email))

                    // Check if email already exist in db
                    const EmailAlreadyExist = emails.filter(email => existingEmailsSet.has(email))

                    if (EmailAlreadyExist.length > 0) {
                        throw new Error(SOME_EMAIL_ALREADY_EXIST)
                    }
                }

                // Deleted emails validation
                if (fieldName === 'removedEmails') {
                    // Validate array data
                    for (const item of value) {
                        try {
                            const intEmailId = parseInt(item.emailId)
                            if (typeof intEmailId !== 'number') throw new Error(INVALID_EMAILS_LIST)
                        } catch (err) {
                            throw new Error(INVALID_EMAILS_LIST)
                        }
                    }

                    // Get ids from db
                    const existingIdsSet = new Set(existingEmails.map(email => email.emailId))

                    // Check if id exist in db to be deleted
                    const nonExistingIds = value.filter(item => !existingIdsSet.has(item.emailId))

                    if (nonExistingIds.length > 0) {
                        throw new Error(REMOVED_EMAILS_NOT_FOUND)
                    }
                }
                return true
            }
            return true
        })
}

export default validateEmailsData
import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import { sendEmail } from './sendEmail.js'
const { AN_ERROR_OCURRED_WHILE_SENDING_EMAIL } = errorCodes.emailErrors

const sendEmailtoAdminEmails = async(req, res) => {
    const { userEmail, userName, emailSubject, emailContent, adminAllowedEmails } = req.body
    const destinataryEmails = adminAllowedEmails.map(emailData => emailData.email)
    const adminOwnerEmail = process.env.GMAIL_API_USER

    if (!destinataryEmails) {
        const error = [{ msg: AN_ERROR_OCURRED_WHILE_SENDING_EMAIL }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error })
    }

    const mailOptions = {
        from: adminOwnerEmail,
        to: destinataryEmails.join(','),
        subject: emailSubject,
        html: `
                <h1>${userName} has contacted from Fustalforher.ch!</h1>
                <br></br>
                <p>${emailContent}</p>
                <br></br>
                <h2><strong>Please remember to give an answer to the user<strong></h2>
                <p><strong>By email:</strong> ${userEmail}</p>
            `
    }

    try {
        await sendEmail(mailOptions)
        return res.status(StatusCodes.OK).send()
    } catch (err) {
        console.log('ERROR: ', err)
        const error = [{ msg: AN_ERROR_OCURRED_WHILE_SENDING_EMAIL }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error })
    }
}

export default sendEmailtoAdminEmails
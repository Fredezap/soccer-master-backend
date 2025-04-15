/* eslint-disable no-useless-catch */
import { transporter } from '../../../emailConfig/emailConfig.js'

export const sendEmail = async(mailOptions) => {
    if (!mailOptions) {
        throw new Error()
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        throw error
    }
}
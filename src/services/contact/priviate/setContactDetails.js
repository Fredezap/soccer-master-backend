import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import contactDetailsService from '../common/contactDetailsService.js'

const { AN_ERROR_OCURRED_WHILE_SETTING_CONTACT_DETAILS } = errorCodes.contactErrors
const setContactDetails = async(req, res) => {
    try {
        let {
            values: { contactAddress, contactEmail, contactPhone },
            tournamentId
        } = req.body

        if (contactEmail === '') contactEmail = null // To avoid Validation error: Validation isEmail on contactEmail
        const details = { contactAddress, contactEmail, contactPhone }

        console.log('DET antes: ', details)
        await contactDetailsService.set(details, tournamentId)
        // const allTournaments = await tournamentService.findAll()
        return res.status(StatusCodes.OK).json({})
    } catch (err) {
        console.log('ERR: ', err)
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_SETTING_CONTACT_DETAILS }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default setContactDetails
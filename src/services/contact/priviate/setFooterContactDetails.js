import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import contactDetailsService from '../common/contactDetailsService.js'

const { AN_ERROR_OCURRED_WHILE_SETTING_CONTACT_DETAILS } = errorCodes.contactErrors
const setFooterContactDetails = async(req, res) => {
    try {
        let {
            values: { footerContactWebPage, footerContactInstagram },
            tournamentId
        } = req.body
        if (footerContactWebPage === '') footerContactWebPage = null
        if (footerContactInstagram === '') footerContactInstagram = null
        const details = { footerContactWebPage, footerContactInstagram }

        await contactDetailsService.set(details, tournamentId)
        return res.status(StatusCodes.OK).json({})
    } catch (err) {
        const errors = [{ msg: AN_ERROR_OCURRED_WHILE_SETTING_CONTACT_DETAILS }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default setFooterContactDetails
/* eslint-disable no-useless-catch */
import { Contact } from '../../../models/contactModel.js'

const set = async(details, tournamentId) => {
    await Contact.upsert({
        ...details,
        tournamentId
    })
}

const contactDetailsService = {
    set
}

export default contactDetailsService
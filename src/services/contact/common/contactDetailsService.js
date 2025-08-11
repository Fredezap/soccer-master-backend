/* eslint-disable no-useless-catch */
import { Contact } from '../../../models/contactModel.js'

const set = async(details, tournamentId) => {
    try {
        await Contact.upsert({
            ...details,
            tournamentId,
            deleted: false
        })
    } catch (error) {
        throw error
    }
}

const findByTournamentId = async(tournamentId) => {
    return await Contact.findOne({
        where: {
            tournamentId,
            deleted: false
        }
    })
}

const contactDetailsService = {
    set,
    findByTournamentId
}

export default contactDetailsService
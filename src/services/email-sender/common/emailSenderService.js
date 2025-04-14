/* eslint-disable no-useless-catch */
import { Email } from '../../../models/emailsModel.js'

const create = async(emails, tournamentId) => {
    return await Email.bulkCreate(
        emails.map(({ email }) => ({ email, tournamentId }))
    )
}

const findAllByTournament = async(tournamentId) => {
    return await Email.findAll({
        where: { tournamentId }
    })
}

const destroy = async(ids) => {
    try {
        const deleted = await Email.destroy({
            where: {
                emailId: ids
            }
        })
    } catch (error) {
        throw error
    }
}

const emailSenderService = {
    create,
    findAllByTournament,
    destroy
}

export default emailSenderService
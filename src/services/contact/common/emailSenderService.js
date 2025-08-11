/* eslint-disable no-useless-catch */
import { Email } from '../../../models/emailsModel.js'
import { Op } from 'sequelize'

const create = async(emails, tournamentId) => {
    return await Email.bulkCreate(
        emails.map(({ email }) => ({ email, tournamentId }))
    )
}

const findAllByTournament = async(tournamentId) => {
    return await Email.findAll({
        where: {
            tournamentId,
            deleted: false
        }
    })
}

const destroy = async(ids) => {
    try {
        const updated = await Email.update(
            { deleted: true },
            {
                where: {
                    emailId: {
                        [Op.in]: ids
                    },
                    deleted: false
                }
            }
        )
        return updated
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
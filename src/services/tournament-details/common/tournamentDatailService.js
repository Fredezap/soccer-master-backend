import { TournamentDetails } from '../../../models/tournamentDetailsModel.js'

const create = async(data) => {
    const response = await TournamentDate.create(data)
    return response
}

const findOne = async() => {
    return await TournamentDetails.findOne()
}

const update = async(data) => {
    const [updatedRows] = await TournamentDetails.update(
        data,
        { where: { tournamentDetailsId: data.tournamentDetailsId } }
    )

    if (updatedRows > 0) {
        const tournamentDetailsResult = await TournamentDetails.findByPk(data.tournamentDetailsId)
        return { success: true, tournamentDetails: tournamentDetailsResult }
    } else {
        return { success: false }
    }
}

const tournamentDatailService = {
    create,
    findOne,
    update
}

export default tournamentDatailService
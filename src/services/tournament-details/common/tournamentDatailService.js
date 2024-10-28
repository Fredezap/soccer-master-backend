import { where } from 'sequelize'
import { TournamentDate } from '../../../models/tournamentDateModel.js'

const create = async(data) => {
    console.log(data)
    const response = await TournamentDate.create(data)
    return response
}

const findOne = async() => {
    return await TournamentDate.findOne()
}

const tournamentDatailService = {
    create,
    findOne
}

export default tournamentDatailService
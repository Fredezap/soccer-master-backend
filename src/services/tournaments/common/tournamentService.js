import { Op } from 'sequelize'
import { Tournament } from '../../../models/tournamentModel.js'
import { sequelize } from '../../../database/connection.js'
import { Match } from '../../../models/matchModel.js'
import { Team } from '../../../models/teamModel.js'
import { Stage } from '../../../models/stageModel.js'
import { Player } from '../../../models/playerModel.js'
import { Group } from '../../../models/groupModel.js'

const create = async({ name, date }) => {
    return await Tournament.create({ name, date })
}

const findOneByNameAndDate = async(values) => {
    const { date, name } = values

    const formattedDate = date instanceof Date
        ? date.toISOString().split('T')[0]
        : date.split('T')[0]

    const existingTournament = await Tournament.findOne({
        where: {
            [Op.and]: [
                sequelize.where(
                    sequelize.fn('DATE', sequelize.col('date')),
                    formattedDate
                ),
                { name }
            ]
        }
    })
    return existingTournament
}

const findOneById = async(tournamentId) => {
    return await Tournament.findByPk(tournamentId, {
        include: [
            {
                model: Team,
                include: [Player]
            },
            {
                model: Stage,
                include: [
                    {
                        model: Group,
                        include: [Team]
                    },
                    Match
                ]
            }
        ]
    })
}

const findAll = async() => {
    return await Tournament.findAll()
}

const update = async(data) => {
    const [updatedRows] = await Tournament.update(
        data,
        { where: { tournamentId: data.tournamentId } }
    )

    if (updatedRows > 0) {
        const tournamentResult = await Tournament.findByPk(data.tournamentId)
        return { success: true, tournamentDetails: tournamentResult }
    } else {
        return { success: false }
    }
}

const tournamentService = {
    create,
    findOneByNameAndDate,
    findOneById,
    findAll,
    update
}

export default tournamentService
/* eslint-disable no-useless-catch */
import { Team } from '../../../models/teamModel.js'
import { Player } from '../../../models/playerModel.js'

const create = async(data) => {
    const { name, players, tournamentId } = data

    try {
        const response = await Team.create(
            {
                name,
                Players: players || [],
                tournamentId
            },
            {
                include: [Player]
            }
        )

        return response
    } catch (error) {
        throw error
    }
}

const getOneByName = async(name, tournamentId) => {
    const response = await Team.findOne({ where: { name, tournamentId } })
    return response
}

const getOneById = async(id) => {
    return Team.findByPk(id, { include: [Player] })
}

const getAll = async() => {
    return await Team.findAll({
        include: [
            {
                model: Player
            }
        ]
    })
}

const getAllByTournamentId = async(tournamentId) => {
    return await Team.findAll({
        where: {
            tournamentId
        },
        include: [
            {
                model: Player
            }
        ]
    })
}

const update = async({ teamId, name }, { transaction = null }) => {
    return await Team.update(
        { name },
        {
            where: { teamId },
            transaction
        }
    )
}

const destroy = async({ teamId }) => {
    try {
        const result = await Team.destroy({
            where: { teamId }
        })

        if (result === 0) {
            throw new Error(`Team with ID ${teamId} not found`)
        }

        return result
    } catch (error) {
        throw error
    }
}

const teamService = {
    create,
    getOneByName,
    getAll,
    getAllByTournamentId,
    getOneById,
    update,
    destroy
}

export default teamService
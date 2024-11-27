import { Team } from '../../../models/teamModel.js'
import { Player } from '../../../models/playerModel.js'

const create = async(data) => {
    const { name, players } = data

    // eslint-disable-next-line no-useless-catch
    try {
        const response = await Team.create(
            {
                name,
                Players: players || []
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

const getOneByName = async(name) => {
    const response = await Team.findOne({ where: { name } })
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
    // eslint-disable-next-line no-useless-catch
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
    getOneById,
    update,
    destroy
}

export default teamService
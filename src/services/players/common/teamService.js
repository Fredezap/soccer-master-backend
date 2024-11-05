import { Player } from '../../../models/playerModel.js'

const add = async({ name, teamId }, { transaction = null }) => {
    try {
        const newPlayer = await Player.create(
            { name, teamId },
            { transaction }
        )
        return newPlayer
    } catch (error) {
        console.error('Error adding new player:', error)
        throw error
    }
}

const destroy = async({ playerId }, { transaction = null }) => {
    try {
        const result = await Player.destroy({
            where: { playerId },
            transaction
        })

        if (result === 0) {
            throw new Error(`Player with ID ${playerId} not found`)
        }

        return result
    } catch (error) {
        console.error(`Error deleting player with ID ${playerId}:`, error)
        throw error
    }
}

const playerService = {
    destroy,
    add
}

export default playerService
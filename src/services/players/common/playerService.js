/* eslint-disable no-useless-catch */
import { Player } from '../../../models/playerModel.js'

const add = async({ name, teamId }, { transaction = null }) => {
    try {
        const newPlayer = await Player.create(
            { name, teamId },
            { transaction }
        )
        return newPlayer
    } catch (error) {
        throw error
    }
}

const destroy = async({ playerId }, { transaction = null }) => {
    try {
        const result = await Player.update(
            { deleted: true },
            {
                where: { playerId, deleted: false }, // solo actualiza si no esta eliminado
                transaction
            }
        )

        if (result[0] === 0) {
            throw new Error(`Player with ID ${playerId} not found or already deleted`)
        }

        return result
    } catch (error) {
        throw error
    }
}

const playerService = {
    destroy,
    add
}

export default playerService
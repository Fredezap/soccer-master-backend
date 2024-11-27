import { Player } from '../../../models/playerModel.js'

const add = async({ name, teamId }, { transaction = null }) => {
    // eslint-disable-next-line no-useless-catch
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
    // eslint-disable-next-line no-useless-catch
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
        throw error
    }
}

const playerService = {
    destroy,
    add
}

export default playerService
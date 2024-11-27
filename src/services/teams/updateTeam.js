import { StatusCodes } from 'http-status-codes'
import { sequelize } from '../../database/connection.js' // Importa tu conexión de Sequelize
import teamService from './common/teamService.js'
import errorCodes from '../../constants/errors/errorCodes.js'
import playerService from '../players/common/teamService.js'

const updateTeam = async(req, res) => {
    const { ERROR_WHILE_UPDATING_TEAM } = errorCodes.teamErrors
    const { name, players, team } = req.body
    const transaction = await sequelize.transaction()
    const teamId = team.teamId

    try {
        const existingPlayers = team.Players || []
        const newPlayers = players || []

        const playersToRemove = existingPlayers.filter(existingPlayer =>
            existingPlayer.playerId &&
            !newPlayers.some(newPlayer => newPlayer.playerId === existingPlayer.playerId)
        )

        const playersToAdd = newPlayers.filter(newPlayer => !newPlayer.playerId)

        const playerRemovalPromises = playersToRemove.length > 0
            ? playersToRemove.map(player => playerService.destroy({ playerId: player.playerId }, { transaction }))
            : []

        const playerAdditionPromises = playersToAdd.length > 0
            ? playersToAdd.map(player => playerService.add({ name: player.name, teamId }, { transaction }))
            : []

        await Promise.all([
            ...playerRemovalPromises,
            ...playerAdditionPromises
        ])

        if (name !== team.name) {
            await teamService.update({ teamId, name }, { transaction })
        }

        await transaction.commit()
        return res.status(StatusCodes.OK).json({ success: true })
    } catch (error) {
        await transaction.rollback()
        const errors = [{ msg: ERROR_WHILE_UPDATING_TEAM }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export default updateTeam
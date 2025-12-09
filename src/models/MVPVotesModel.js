import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'

export const MVPVotes = sequelize.define('MVPVotes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    tournamentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Tournaments',
            key: 'tournamentId'
        },
        onDelete: 'CASCADE'
    },
    playerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Players',
            key: 'playerId'
        },
        onDelete: 'CASCADE'
    },
    userIp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

// await sequelize.sync({ alter: true })
await sequelize.sync()
    .then(() => {
        logger.info('MVPVotes synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing MVPVotes:', err)
    })
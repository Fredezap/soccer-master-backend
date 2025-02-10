import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'

export const Tournament = sequelize.define('Tournament', {
    tournamentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
})

await sequelize.sync({ alter: true })
    .then(() => {
        logger.info('Tournament synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing Tournament:', err)
    })
import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'

export const TournamentDetails = sequelize.define('TournamentDetails', {
    tournamentDetailsId: {
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

// Sincronizar el modelo con la base de datos
await sequelize.sync({ alter: true })
    .then(() => {
        logger.info('TournamentDetails synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing TournamentDetails:', err)
    })
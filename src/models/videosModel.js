import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { Tournament } from './tournamentModel.js'

export const Video = sequelize.define('Videos', {
    videoId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    videoUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tournamentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tournament,
            key: 'tournamentId'
        },
        onDelete: 'CASCADE'
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    defaultScope: {
        where: {
            deleted: false
        }
    },
    scopes: {
        withDeleted: {}
    }
})

// await sequelize.sync({ alter: true })
await sequelize.sync()
    .then(() => {
        logger.info('Videos synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing Videos:', err)
    })
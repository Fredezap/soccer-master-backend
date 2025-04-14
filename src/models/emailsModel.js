import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { Tournament } from './tournamentModel.js'

export const Email = sequelize.define('Email', {
    emailId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    tournamentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tournament,
            key: 'tournamentId'
        },
        onDelete: 'CASCADE'
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['email', 'tournamentId']
        }
    ]
})

// await sequelize.sync({ alter: true })
await sequelize.sync()
    .then(() => {
        logger.info('Emails synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing Emails:', err)
    })
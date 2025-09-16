import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { teamsConstants } from '../constants/teams/teamsConstants.js'
import { Tournament } from './tournamentModel.js'

const { MIN_NAME_LENGTH, MAX_NAME_LENGTH } = teamsConstants

export const Team = sequelize.define('Team', {
    teamId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [MIN_NAME_LENGTH, MAX_NAME_LENGTH]
        }
    },
    logoUrl: {
        type: DataTypes.STRING,
        allowNull: true
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
        logger.info('Team synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing Team:', err)
    })
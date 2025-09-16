import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { playerConstants } from '../constants/player/playerConstants.js'
import { Team } from './teamModel.js'

const { MIN_NAME_LENGTH, MAX_NAME_LENGTH } = playerConstants

export const Player = sequelize.define('Player', {
    playerId: {
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
    teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Team,
            key: 'teamId'
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

await sequelize.sync({ alter: true })
// await sequelize.sync()
    .then(() => {
        logger.info('Player synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing Player:', err)
    })
import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { playerConstants } from '../constants/player/playerConstants.js'

const { MIN_NAME_LENGTH, MIN_SURNAME_LENGTH, MAX_NAME_LENGTH, MAX_SURNAME_LENGTH } = playerConstants

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
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [MIN_SURNAME_LENGTH, MAX_SURNAME_LENGTH]
        }
    }
    // todo: agreagr team y ver que mas
})

await sequelize.sync({ alter: true })
    .then(() => {
        logger.info('Player synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing Player:', err)
    })
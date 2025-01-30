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
    tournamentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Tournament,
            key: 'tournamentId'
        },
        onDelete: 'CASCADE'
    }
})

await sequelize.sync({ alter: true })
    .then(() => {
        logger.info('Team synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing Team:', err)
    })
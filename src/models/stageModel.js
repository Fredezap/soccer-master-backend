import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import StagesConstansts from '../constants/stages/stagesConstansts.js'
import { Tournament } from './tournamentModel.js'

export const Stage = sequelize.define('Stage', {
    stageId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM(StagesConstansts.GROUP, StagesConstansts.KNOCKOUT),
        allowNull: false
    },
    order: {
        type: DataTypes.INTEGER,
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
    wonPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    lostPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    drawnPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
})

await sequelize.sync({ alter: true })
    .then(() => {
        logger.info('Stage synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing Stage:', err)
    })

// drawnPoints, wonPoints and lostPoints are fields to set how many points will recive for any of those results.
// Ej: if wonPoints = 3, when the team win a match, it will agrregate 3 points to totalTeamPoints.
// Ej: if drawnPoints = 1, when the team draw a match, it will agrregate 1 point to totalTeamPoints and so.
// Admin must set this data (drawnPoints, wonPoints and lostPoints) before adding match results.
// If this 3 datas are = 0, it will return an error. There must be at least 1 of them that aggregate points.
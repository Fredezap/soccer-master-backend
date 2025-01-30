import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { Team } from './teamModel.js'
import { Stage } from './stageModel.js'
import { Tournament } from './tournamentModel.js'

export const Match = sequelize.define('Match', {
    matchId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    stageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Stage,
            key: 'stageId'
        },
        onDelete: 'CASCADE'
    },
    localTeamId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Team,
            key: 'teamId'
        }
    },
    visitorTeamId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Team,
            key: 'teamId'
        }
    },
    localTeamPlaceholder: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Description for local team (for example, 1º Group A)'
    },
    visitorTeamPlaceholder: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Description for visitor team (for example, 4º Group B)'
    },
    localTeamScore: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    visitorTeamScore: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    localTeamPenaltyScore: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    visitorTeamPenaltyScore: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

await sequelize.sync({ alter: true })
    .then(() => {
        logger.info('Match synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing Match:', err)
    })
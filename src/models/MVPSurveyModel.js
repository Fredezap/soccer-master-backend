import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'

export const MVPSurvey = sequelize.define('MVPSurvey', {
    mvpSurveyId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    tournamentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Tournaments',
            key: 'tournamentId'
        }
    },
    playerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Players',
            key: 'playerId'
        }
    },
    showMVP: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    votingIsAvaliable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},
{
    defaultScope: {
        where: { deleted: false }
    },
    scopes: {
        withDeleted: {}
    }
})

// await sequelize.sync({ alter: true })
await sequelize.sync()
    .then(() => {
        logger.info('MVPSurvey synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing MVPSurvey:', err)
    })
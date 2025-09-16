import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { Team } from './teamModel.js'
import { Group } from './groupModel.js'
import TeamGroupConstants from '../constants/teamGroup/teamGroupConstants.js'

export const TeamGroup = sequelize.define('TeamGroup', {
    teamGroupId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Team,
            key: 'teamId'
        }
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Group,
            key: 'groupId'
        },
        onDelete: 'CASCADE'
    },
    totalTeamPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    WON: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    LOST: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    DRAWN: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    goalsFor: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    goalsAgainst: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    goalDifference: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
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

TeamGroup.belongsTo(sequelize.models.Team, { foreignKey: 'teamId', onDelete: 'CASCADE' })
TeamGroup.belongsTo(sequelize.models.Group, { foreignKey: 'groupId', onDelete: 'CASCADE' })
TeamGroup.belongsTo(sequelize.models.Match, { foreignKey: 'matchId', onDelete: 'CASCADE' })

// await sequelize.sync({ alter: true })
await sequelize.sync()
    .then(() => {
        logger.info('TeamGroup synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing TeamGroup:', err)
    })
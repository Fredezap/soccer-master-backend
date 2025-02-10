import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { Team } from './teamModel.js'
import { Group } from './groupModel.js'
import TeamGroupConstants from '../constants/teamGroup/teamGroupConstants.js'

const { WON, LOST, DRAWN } = TeamGroupConstants
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
    }
})

TeamGroup.belongsTo(sequelize.models.Team, { foreignKey: 'teamId', onDelete: 'CASCADE' })
TeamGroup.belongsTo(sequelize.models.Group, { foreignKey: 'groupId', onDelete: 'CASCADE' })
TeamGroup.belongsTo(sequelize.models.Match, { foreignKey: 'matchId', onDelete: 'CASCADE' })

await sequelize.sync({ alter: true })
    .then(() => {
        logger.info('TeamGroup synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing TeamGroup:', err)
    })
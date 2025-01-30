import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { Team } from './teamModel.js'
import { Group } from './groupModel.js'

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
    }
})
TeamGroup.belongsTo(sequelize.models.Team, { foreignKey: 'teamId', onDelete: 'CASCADE' })
TeamGroup.belongsTo(sequelize.models.Group, { foreignKey: 'groupId', onDelete: 'CASCADE' })

await sequelize.sync()
    .then(() => {
        logger.info('TeamGroup synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing TeamGroup:', err)
    })
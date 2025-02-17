import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { Stage } from './stageModel.js'

export const Group = sequelize.define('Group', {
    groupId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
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
    }
})

await sequelize.sync({ alter: true })
    .then(() => {
        logger.info('Group synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing Group:', err)
    })
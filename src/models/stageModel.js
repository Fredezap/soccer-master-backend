import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import StagesConstansts from '../constants/stages/stagesConstansts.js'

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
    }
})

await sequelize.sync()
    .then(() => {
        logger.info('Stage synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing Stage:', err)
    })
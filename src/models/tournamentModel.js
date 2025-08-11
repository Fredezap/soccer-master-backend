import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'

export const Tournament = sequelize.define('Tournament', {
    tournamentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    tournamentLogo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mainBgImg: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'userId'
        },
        onDelete: 'CASCADE'
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

// await sequelize.sync({ alter: true })
await sequelize.sync()
    .then(() => {
        logger.info('Tournament synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing Tournament:', err)
    })
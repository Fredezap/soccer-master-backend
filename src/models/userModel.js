import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { userConstants } from '../constants/user/userConstants.js'
const { MIN_PASSWORD_LENGTH, ROLES: { ADMIN, USER, GUEST } } = userConstants

export const User = sequelize.define('User', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [2, 50]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    role: {
        type: DataTypes.ENUM(USER, GUEST, ADMIN),
        allowNull: false,
        defaultValue: 'user'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [MIN_PASSWORD_LENGTH]
        }
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

sequelize.sync()
    .then(() => {
        logger.info('User synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing User:', err)
    })
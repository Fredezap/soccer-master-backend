import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'
import { userConstants } from '../constants/user/userConstants.js'

const { MIN_PASSWORD_LENGTH, ROLES: { ADMIN, USER, GUEST, SUPERADMIN } } = userConstants

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
        type: DataTypes.ENUM(USER, GUEST, ADMIN, SUPERADMIN),
        allowNull: false,
        defaultValue: userConstants.ROLES.USER
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
        logger.info('User synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing User:', err)
    })
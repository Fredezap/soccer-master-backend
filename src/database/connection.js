import logger from '../utils/logger.js'
import { Sequelize } from 'sequelize'

const { PG_AUTH_USER, PG_HOST, PG_DATABASE, PG_PASSWORD, PG_PORT, PG_DIALECT } = process.env

export const sequelize = new Sequelize(PG_DATABASE, PG_AUTH_USER, PG_PASSWORD, {
    host: PG_HOST,
    port: PG_PORT,
    dialect: PG_DIALECT,
    logging: false
    // logging: console.log,
})

export const connectToDatabase = async() => {
    try {
        await sequelize.authenticate()
        logger.info('Connected to database')
    } catch (error) {
        logger.error('Unable to connect to the database:', error?.stack)
    }
}
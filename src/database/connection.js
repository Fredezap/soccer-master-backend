import logger from '../utils/logger.js'
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}`
})

const { PG_AUTH_USER, PG_HOST, PG_DATABASE, PG_PASSWORD, PG_PORT, PG_DIALECT } = process.env

export const sequelize = new Sequelize(PG_DATABASE, PG_AUTH_USER, PG_PASSWORD, {
    host: PG_HOST,
    port: PG_PORT,
    dialect: PG_DIALECT,
    timezone: '+01:00',
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
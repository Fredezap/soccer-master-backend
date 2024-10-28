import winston from 'winston'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: process.env.LOGGER_ERROR_FILE || 'error.log',
            level: 'error'
        }),
        new winston.transports.File({ filename: process.env.LOGGER_FILE || 'combined.log' })
    ]
})

export default logger
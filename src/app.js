import 'dotenv/config'
import app from './server.js'
import logger from './utils/logger.js'
import { connectToDatabase } from './database/connection.js'

const PORT = process.env.PORT || 3002;

(async() => {
    await connectToDatabase()

    app.listen(PORT, async() => {
        logger.info(`App listening on port ${PORT}!`)
    })
})()
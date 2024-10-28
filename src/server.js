import express from 'express'
import expressOasGenerator from 'express-oas-generator'
import logger from 'morgan'
import cors from 'cors'
import { router } from './router.js'
import { modelsAssociations } from './models/modelsAssociations.js'
import { modelsExportations } from './models/modelsExportations.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

const environment = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''
dotenv.config({ path: `.env${environment}` })
const server = express()
server.use(logger(process.env.LOGGER_LEVEL))
server.use(cors())
server.use(bodyParser.json())

server.use(express.json())
server.use('/api', router)
modelsAssociations()

expressOasGenerator.handleResponses(server, {
    specOutputPath: './api_docs.json',
    modelsExportations,
    ignoredNodeEnvironments: ['production'],
    alwaysServeDocs: true
})
expressOasGenerator.handleRequests()

export default server
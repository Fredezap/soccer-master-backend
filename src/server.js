import express from 'express'
import expressOasGenerator from 'express-oas-generator'
import logger from 'morgan'
import cors from 'cors'
import { router } from './router.js'
import { modelsAssociations } from './models/modelsAssociations.js'
import { modelsExportations } from './models/modelsExportations.js'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'

const environment = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''
dotenv.config({ path: `.env${environment}` })
const server = express()
server.use(logger(process.env.LOGGER_LEVEL))
server.use(cors())
server.use(bodyParser.json())
server.use(express.json())
server.use('/api', router)
modelsAssociations()

// Ajustamos el limite de tamaño de carga de express (sobre todo para imagen) a 5mb
server.use(express.json({ limit: '5mb' }))
server.use(express.urlencoded({ extended: true, limit: '5mb' }))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const uploadFolder = path.join(projectRoot, '/uploads')
server.use('/uploads', express.static(uploadFolder))

expressOasGenerator.handleResponses(server, {
    specOutputPath: './api_docs.json',
    modelsExportations,
    ignoredNodeEnvironments: ['production'],
    alwaysServeDocs: true
})
expressOasGenerator.handleRequests()

export default server
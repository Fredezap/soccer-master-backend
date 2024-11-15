import express from 'express'
import stagesRouter from './stagesRouter.js'
import groupsRouter from './groupsRouter.js'

const fixtureRouter = express.Router()

fixtureRouter.use('/stages', stagesRouter)
fixtureRouter.use('/groups', groupsRouter)

export default fixtureRouter
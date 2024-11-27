import express from 'express'
import stagesRouter from './stagesRouter.js'
import groupsRouter from './groupsRouter.js'
import matchesRouter from './matchesRouter.js'

const fixtureRouter = express.Router()

fixtureRouter.use('/stages', stagesRouter)
fixtureRouter.use('/groups', groupsRouter)
fixtureRouter.use('/matches', matchesRouter)

export default fixtureRouter
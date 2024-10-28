import express from 'express'
import tournamentDateRouter from './routes/tournamentDateRouter.js'
import adminRouter from './routes/adminRouter.js'

export const router = express.Router()
router.use('/admin', adminRouter)
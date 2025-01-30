import express from 'express'
import adminRouter from './routes/adminRouter.js'
import authRouter from './routes/authRouter.js'
import publicTournamentRouter from './routes/publicTournamentRouter.js'

export const router = express.Router()
router.use('/tournaments', publicTournamentRouter)
router.use('/admin', adminRouter)
router.use('/auth', authRouter)
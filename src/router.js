import express from 'express'
import adminRouter from './routes/adminRouter.js'
import authRouter from './routes/authRouter.js'

export const router = express.Router()
router.use('/admin', adminRouter)
router.use('/auth', authRouter)
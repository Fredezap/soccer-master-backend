import express from 'express'
import adminRouter from './routes/adminRouter.js'

export const router = express.Router()
router.use('/admin', adminRouter)
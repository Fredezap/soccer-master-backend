import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import adminCredentials from '../middlewares/admin/adminCredentials.js'
import tournamentDateRouter from './tournamentDateRouter.js'
import teamRouter from './teamRouter.js'

const adminRouter = express.Router()

const runCheckAdminCredentials = runValidations([
    adminCredentials
])

adminRouter.use(runCheckAdminCredentials)
adminRouter.use('/tournament-details', tournamentDateRouter)
adminRouter.use('/teams', teamRouter)

// todo: necesito este endpoint?
// adminRouter.post('/get-info',
// )

export default adminRouter
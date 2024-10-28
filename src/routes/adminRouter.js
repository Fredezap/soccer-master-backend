import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import adminCredentials from '../middlewares/admin/adminCredentials.js'
import tournamentDateRouter from './tournamentDateRouter.js'

const adminRouter = express.Router()

const runCheckAdminCredentials = runValidations([
    adminCredentials
])

const print = (req, res, next) => {
    console.log('en print')
    console.log(req.body)
    next()
}

adminRouter.use(runCheckAdminCredentials)

adminRouter.use('/tournament-details', tournamentDateRouter)

adminRouter.post('/get-info',
    print
)

export default adminRouter
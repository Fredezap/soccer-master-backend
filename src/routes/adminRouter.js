import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateToken from '../middlewares/user/validations/validateToken.js'
import validateRole from '../middlewares/user/validations/validateRole.js'
import verifyUserToken from '../middlewares/user/validations/verifyUserToken.js'
import { checkTokenAndRoleDb } from '../middlewares/user/validations/checkTokenAndRoleDb.js'
import priviteTournamentRouter from './priviteTournamentRouter.js'
import teamRouter from './teamRouter.js'
import fixtureRouter from './fixture/fixtureRouter.js'

const adminRouter = express.Router()

const extractAuthFields = (req, res, next) => {
    req.body.token = req.headers.authorization?.replace('Bearer ', '') || req.body.token
    req.body.role = req.headers.role || req.body.role
    next()
}

const runValidateAdminValues = runValidations([
    validateToken,
    validateRole
])

adminRouter.use(extractAuthFields, runValidateAdminValues, verifyUserToken, checkTokenAndRoleDb)
adminRouter.use('/tournament-details', priviteTournamentRouter)
adminRouter.use('/teams', teamRouter)
adminRouter.use('/fixture', fixtureRouter)

adminRouter.post('/validate-access', (req, res) => {
    res.status(200).json({})
})

adminRouter.patch('/validate-access', (req, res) => {
    res.status(200).json({})
})

export default adminRouter
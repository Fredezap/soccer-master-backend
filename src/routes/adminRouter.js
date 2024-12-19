import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import tournamentRouter from './tournamentRouter.js'
import teamRouter from './teamRouter.js'
import fixtureRouter from './fixture/fixtureRouter.js'
import validateToken from '../middlewares/user/validations/validateToken.js'
import validateRole from '../middlewares/user/validations/validateRole.js'
import verifyUserToken from '../middlewares/user/validations/verifyUserToken.js'
import { checkTokenAndRoleDb } from '../middlewares/user/validations/checkTokenAndRoleDb.js'

const adminRouter = express.Router()

const runValidateAdminValues = runValidations([
    validateToken,
    validateRole
])

adminRouter.use(runValidateAdminValues, verifyUserToken, checkTokenAndRoleDb)
adminRouter.use('/tournament-details', tournamentRouter)
adminRouter.use('/teams', teamRouter)
adminRouter.use('/fixture', fixtureRouter)

adminRouter.post('/validate-access', (req, res) => {
    res.status(200).json({})
})

export default adminRouter
import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateTournamentName from '../middlewares/tournament-details/validateTournamentName.js'
import validateTournamentDate from '../middlewares/tournament-details/validateTournamentDate.js'
import { createTournamentDate } from '../services/tournament-details/createTournamentDate.js'
import getTournamentDetails from '../services/tournament-details/getTournamentDetails.js'

const tournamentDateRouter = express.Router()

const runTournamentStartingTimeRouter = runValidations([
    validateTournamentName,
    validateTournamentDate
])

const print = (req, res, next) => {
    console.log('en print')
    console.log(req.body)
    next()
}

tournamentDateRouter.post('/create',
    print,
    runTournamentStartingTimeRouter,
    createTournamentDate
)

tournamentDateRouter.patch('/update',
    print
    // runTournamentStartingTimeRouter
    // updateTournamentStartingTime
)

tournamentDateRouter.post('/get-details',
    print,
    getTournamentDetails
)

export default tournamentDateRouter
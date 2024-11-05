import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateTournamentName from '../middlewares/tournament-details/validateTournamentName.js'
import validateTournamentDate from '../middlewares/tournament-details/validateTournamentDate.js'
import createTournamentDetails from '../services/tournament-details/createTournamentDetails.js'
import getTournamentDetails from '../services/tournament-details/getTournamentDetails.js'
import updateTournamentDetails from '../services/tournament-details/updateTournamentDetails.js'
import validateTournamentId from '../middlewares/tournament-details/validateTournamentId.js'

const tournamentDetailsRouter = express.Router()

const runCreateValidations = runValidations([
    validateTournamentName,
    validateTournamentDate
])

const runUpdateValidations = runValidations([
    validateTournamentName,
    validateTournamentDate,
    validateTournamentId
])

// const print = (req, res, next) => {
//     console.log('en print')
//     console.log(req.body)
//     next()
// }

tournamentDetailsRouter.post('/create',
    runCreateValidations,
    createTournamentDetails
)

tournamentDetailsRouter.patch('/update',
    runUpdateValidations,
    updateTournamentDetails
)

tournamentDetailsRouter.post('/get-details',
    getTournamentDetails
)

export default tournamentDetailsRouter
import express from 'express'
import getTournamentDetails from '../services/tournaments/getTournamentDetails.js'
import getAllTournaments from '../services/tournaments/getAllTournaments.js'

const publicTournamentRouter = express.Router()

export default publicTournamentRouter

publicTournamentRouter.post('/get-details',
    getTournamentDetails
)

publicTournamentRouter.post('/get-all',
    getAllTournaments
)
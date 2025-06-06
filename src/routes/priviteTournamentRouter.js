import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateTournamentName from '../middlewares/tournament-details/validateTournamentName.js'
import validateTournamentDate from '../middlewares/tournament-details/validateTournamentDate.js'
import { createTournament } from '../services/tournaments/createTournament.js'
import updateTournamentDetails from '../services/tournaments/updateTournament.js'
import validateTournamentExist from '../middlewares/tournament-details/validateTournamentExist.js'
import checkMultipleImagesAreValid from '../middlewares/common/checkMultipleImagesAreValid.js'
import multer from 'multer'
import printRequest from '../utils/printRequest.js'

const priviteTournamentRouter = express.Router()
const upload = multer({ dest: 'uploads/tournament-images' })

const runCreateValidations = runValidations([
    validateTournamentName,
    validateTournamentDate
])

const runUpdateValidations = runValidations([
    validateTournamentName,
    validateTournamentDate,
    validateTournamentExist
])

priviteTournamentRouter.post('/create',
    upload.array('files'),
    printRequest,
    runCreateValidations,
    checkMultipleImagesAreValid,
    createTournament
)

priviteTournamentRouter.post('/update',
    upload.array('files'),
    printRequest,
    runUpdateValidations,
    checkMultipleImagesAreValid,
    updateTournamentDetails
)

export default priviteTournamentRouter
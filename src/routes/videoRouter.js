import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import checkImageIsValid from '../middlewares/common/checkImageIsValid.js'
import multer from 'multer'
import validateIsString from '../middlewares/videos/validateIsString.js'
import runValidateVideoExist from '../middlewares/videos/runValidateVideoExist.js'
import validateTournamentExist from '../middlewares/tournament-details/validateTournamentExist.js'
import deleteVideo from '../services/videos/deleteVideo.js'
import createVideo from '../services/videos/createVideo.js'
import getAllVideosByTournamentId from '../services/videos/getAllVideosByTournamentId.js'

const videoRouter = express.Router()

const upload = multer({ dest: 'uploads/videos-images' })

const runValidateVideoValues = runValidations([
    validateIsString('title'),
    validateIsString('videoUrl'),
    validateTournamentExist
])

const runVideoExistValidation = runValidations([
    runValidateVideoExist
])

const runValidateTournament = runValidations([
    validateTournamentExist
])

videoRouter.post('/create',
    upload.single('file'),
    // deberia ser upload.single('file') pero da error
    runValidateVideoValues,
    checkImageIsValid,
    createVideo
)

videoRouter.post('/delete',
    runVideoExistValidation,
    runValidateTournament,
    deleteVideo
)

videoRouter.post('/get-all-by-tournament',
    runValidateTournament,
    getAllVideosByTournamentId
)

export default videoRouter
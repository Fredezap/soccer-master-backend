import express from 'express'
import runValidations from '../middlewares/common/validations/runValidations.js'
import validateTeamName from '../middlewares/teams/validateTeamName.js'
import validateTeamPlayers from '../middlewares/teams/validateTeamPlayers.js'
import capitalizeTeamName from '../middlewares/teams/capitalizeTeamName.js'
import capitalizePlayerName from '../middlewares/teams/capitalizePlayersName.js'
import createTeam from '../services/teams/createTeam.js'
import checkIfTeamAlreadyExist from '../middlewares/teams/checkIfTeamAlreadyExist.js'
import getAllTeams from '../services/teams/getAllTeams.js'
import validateTeamExist from '../middlewares/teams/validateTeamExist.js'
import updateTeam from '../services/teams/updateTeam.js'
import deleteTeam from '../services/teams/deleteTeam.js'
import validateTournamentExist from '../middlewares/tournament-details/validateTournamentExist.js'
import getAllTeamsByTournamentId from '../services/teams/getAllTeamsByTournamentId.js'
import checkImageIsValid from '../middlewares/common/checkImageIsValid.js'
import multer from 'multer'
import path from 'path'

const teamRouter = express.Router()

const upload = multer({ dest: 'uploads/' })

const runValidateTeamValues = runValidations([
    validateTeamPlayers,
    validateTeamName
])

const runValidateTournament = runValidations([
    validateTournamentExist
])

const runValidateTeamNotExist = runValidations([
    checkIfTeamAlreadyExist
])

const runValidateTeamExist = runValidations([
    validateTeamExist
])

teamRouter.post('/create',
    upload.any(),
    // deberia ser upload.single('file') pero da error
    runValidateTeamValues,
    runValidateTournament,
    capitalizeTeamName,
    capitalizePlayerName,
    runValidateTeamNotExist,
    checkImageIsValid,
    createTeam
)

teamRouter.post('/update',
    upload.any(),
    // deberia ser upload.single('file') pero da error
    runValidateTeamValues,
    runValidateTournament,
    capitalizeTeamName,
    capitalizePlayerName,
    runValidateTeamExist,
    checkImageIsValid,
    updateTeam
)

teamRouter.post('/delete',
    runValidateTeamExist,
    deleteTeam
)

teamRouter.post('/get-all',
    getAllTeams
)

teamRouter.post('/get-by-tournament',
    runValidateTournament,
    getAllTeamsByTournamentId
)

export default teamRouter
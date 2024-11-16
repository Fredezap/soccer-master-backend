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

const teamRouter = express.Router()

const runValidateTeamValues = runValidations([
    validateTeamName,
    validateTeamPlayers
])

const runValidateTeamNotExist = runValidations([
    checkIfTeamAlreadyExist
])

const runValidateTeamExist = runValidations([
    validateTeamExist
])

const print = (req, res, next) => {
    console.log('en print de team router')
    console.log(req.body)
    next()
}

teamRouter.post('/create',
    runValidateTeamValues,
    capitalizeTeamName,
    capitalizePlayerName,
    runValidateTeamNotExist,
    createTeam
)

teamRouter.patch('/update',
    runValidateTeamValues,
    capitalizeTeamName,
    capitalizePlayerName,
    runValidateTeamExist,
    updateTeam
)

teamRouter.post('/delete',
    runValidateTeamExist,
    deleteTeam
)

teamRouter.post('/get-all',
    // print,
    getAllTeams
)

export default teamRouter
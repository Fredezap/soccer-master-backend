import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import teamService from '../../services/teams/common/teamService.js'

const { TEAM_ALREADY_EXISTS } = errorCodes.teamErrors

const checkIfTeamAlreadyExist = check('name')
    .custom(async(name, { req }) => {
        const { tournamentId } = req.body
        const existingTeam = await teamService.getOneByName(name, tournamentId)
        if (existingTeam) {
            throw new Error(TEAM_ALREADY_EXISTS)
        }
    })

export default checkIfTeamAlreadyExist
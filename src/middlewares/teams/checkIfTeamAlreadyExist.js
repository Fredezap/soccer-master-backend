import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import teamService from '../../services/teams/common/teamService.js'

const { TEAM_ALREADY_EXISTS } = errorCodes.teamErrors

const checkIfTeamAlreadyExist = check('name')
    .custom(async(name) => {
        const existingTeam = await teamService.getOneByName(name)
        if (existingTeam) {
            throw new Error(TEAM_ALREADY_EXISTS)
        }
    })

export default checkIfTeamAlreadyExist
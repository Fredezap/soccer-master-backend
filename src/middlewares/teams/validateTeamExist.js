import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import teamService from '../../services/teams/common/teamService.js'

const { TEAM_NOT_FOUNDED, INVALID_TEAM_ID } = errorCodes.teamErrors

const validateTeamExist = check('teamId')
    .exists({ checkFalsy: true })
    .withMessage(INVALID_TEAM_ID)
    .bail()
    .isNumeric()
    .withMessage(INVALID_TEAM_ID)
    .bail()
    .custom(async(teamId, { req }) => {
        const existingTeam = await teamService.getOneById(teamId)
        if (!existingTeam) {
            throw new Error(TEAM_NOT_FOUNDED)
        }
        req.body.team = existingTeam
    })

export default validateTeamExist
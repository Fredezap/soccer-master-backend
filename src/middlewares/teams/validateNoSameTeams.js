import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_TEAM_ID } = errorCodes.teamErrors
const { TEMAS_CAN_NOT_BE_THE_SAME_TO_MAKE_A_MATCH } = errorCodes.matchErrors

const validateNoSameTeams = check('localTeamId')
    .custom((value, { req }) => {
        const { localTeamId, visitorTeamId } = req.body

        if (!localTeamId || !visitorTeamId) {
            throw new Error(INVALID_TEAM_ID)
        }

        if (localTeamId === visitorTeamId) {
            throw new Error(TEMAS_CAN_NOT_BE_THE_SAME_TO_MAKE_A_MATCH)
        }

        return true
    })

export default validateNoSameTeams
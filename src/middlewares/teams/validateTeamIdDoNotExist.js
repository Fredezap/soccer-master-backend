import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { TEAM_ID_NOT_ALLOWED } = errorCodes.teamErrors

const validateTeamIdDoNotExist = (fieldName) =>
    check(fieldName)
        .custom((value, { req }) => {
            if (req.body[fieldName] !== undefined) {
                throw new Error(TEAM_ID_NOT_ALLOWED)
            }
            return true
        })

export default validateTeamIdDoNotExist
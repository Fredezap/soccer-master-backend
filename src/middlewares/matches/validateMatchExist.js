import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import matchService from '../../services/fixture/matches/common/matchService.js'

const { SELECTED_MATCH_DOES_NOT_EXIST, SELECTED_MATCH_NOT_FOUND } = errorCodes.matchErrors

const validateMatchExist = check('matchId')
    .custom(async(matchId, { req }) => {
        try {
            const match = await matchService.getOneById(matchId)
            if (!match) {
                throw new Error(SELECTED_MATCH_DOES_NOT_EXIST)
            }
            req.body.match = match
        } catch {
            throw new Error(SELECTED_MATCH_NOT_FOUND)
        }
    })

export default validateMatchExist
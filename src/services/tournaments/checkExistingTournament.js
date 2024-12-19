import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentService from './common/tournamentService.js'

export const checkExistingTournament = async(values) => {
    const { AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS, TOURNAMENT_DETAILS_ALREADY_EXIST } = errorCodes.tournamentErrors
    try {
        const existingTournament = await tournamentService.findOneByNameAndDate(values)
        if (existingTournament) {
            return new Error(TOURNAMENT_DETAILS_ALREADY_EXIST)
        }
    } catch (error) {
        return new Error(AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS)
    }
}
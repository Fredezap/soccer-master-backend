import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentService from '../../services/tournaments/common/tournamentService.js'

export const validateTournamentNotExist = async(name, date) => {
    const {
        AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS,
        TOURNAMENT_DETAILS_ALREADY_EXIST
    } = errorCodes.tournamentErrors

    try {
        const matches = await tournamentService.findAllByNameAndDate({ name, date })
        if (matches.length > 0) {
            return new Error(TOURNAMENT_DETAILS_ALREADY_EXIST)
        }

        return null
    } catch (error) {
        return new Error(AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS)
    }
}

export default validateTournamentNotExist
import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentService from './common/tournamentService.js'

export const checkExistingTournament = async(values) => {
    const {
        AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS,
        TOURNAMENT_DETAILS_ALREADY_EXIST
    } = errorCodes.tournamentErrors

    try {
        let { name, date, tournamentId } = values
        tournamentId = parseInt(tournamentId)
        const matches = await tournamentService.findAllByNameAndDate({ name, date })
        // Filtramos todos los que no sean el actual (si se está editando)
        const duplicates = matches.filter(
            t => t.dataValues.tournamentId !== tournamentId
        )
        if (duplicates.length > 0) {
            return new Error(TOURNAMENT_DETAILS_ALREADY_EXIST)
        }

        return null
    } catch (error) {
        return new Error(AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS)
    }
}
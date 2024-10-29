import errorCodes from '../../constants/errors/errorCodes.js'
import tournamentDatailService from './common/tournamentDatailService.js'

export const checkExistingTournament = async(date, name) => {
    const { AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS, TOURNAMENT_DETAILS_ALREADY_EXIST } = errorCodes.tournamentErrors
    try {
        const existingTournament = await tournamentDatailService.findOne()

        if (existingTournament) {
            return new Error(TOURNAMENT_DETAILS_ALREADY_EXIST)
        }
    } catch (error) {
        console.log('ERROR')
        console.error('Error in checkExistingTournament:', error)
        return new Error(AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS)
    }
}
const tournamentErrors = {
    INVALID_TOURNAMENT_NAME: 'invalid tournament name',
    TOURNAMENT_NAME_TOO_LONG: 'tournament name too long',
    TOURNAMENT_NAME_TOO_SHORT: 'tournament name too short',
    INVALID_TOURNAMENT_DATE: 'invalid tournament date',
    INVALID_TOURNAMENT_ID: 'invalid tournament id',
    TOURNAMENT_DATE_IS_MANDATORY: 'tournament date is mandatory',
    TOURNAMENT_DATE_MUST_BE_FUTURE: 'tournament date must be future',
    AN_ERROR_OCURRED_WHILE_CREATING_TOURNAMENT_DETAILS: 'an error ocurred while creating tournament details',
    AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS: 'an error ocurred while getting tournament details',
    AN_ERROR_OCURRED_WHILE_UPDATING_TOURNAMENT_DETAILS: 'an error ocurred while updating tournament details',
    TOURNAMENT_DETAILS_ALREADY_EXIST: 'tournament details already exist, if you want you can update them'
}

const admin = {
    INVALID_CREDENTIALS: 'invalid credentials'
}

const errorCodes = {
    tournamentErrors,
    admin
}

export default errorCodes
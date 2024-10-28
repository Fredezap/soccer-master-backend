const tournamentErrors = {
    INVALID_TOURNAMENT_NAME: 'invalid tournament name',
    TOURNAMENT_NAME_TOO_LONG: 'tournament name too long',
    TOURNAMENT_NAME_TOO_SHORT: 'tournament name too short',
    INVALID_TOURNAMENT_DATE: 'invalid tournament date',
    TOURNAMENT_DATE_IS_MANDATORY: 'tournament date is mandatory',
    TOURNAMENT_DATE_MUST_BE_FUTURE: 'tournament date must be future',
    ERROR_WHILE_CREATING_TOURNAMENT_DATE: 'error while creating tournament date',
    ERROR_WHILE_GETTING_TOURNAMENT_DETAILS: 'error while getting tournament details',
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
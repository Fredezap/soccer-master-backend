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

const teamErrors = {
    ERROR_WHILE_CREATING_TEAM: 'error while creating team',
    INVALID_TEAM_NAME: 'invalid team name',
    TEAM_NAME_TOO_LONG: 'team name too long',
    TEAM_NAME_TOO_SHORT: 'team name too short',
    INVALID_PLAYERS_LIST: 'invalid player list',
    TEAM_ALREADY_EXISTS: 'Team already exist',
    ERROR_WHILE_GETTING_TEAMS: 'error while getting teams',
    TEAM_NOT_FOUNDED: 'team not funded',
    ERROR_WHILE_UPDATING_TEAM: 'error while updating team',
    INVALID_TEAM_ID: 'invalid team id',
    ERROR_WHILE_DELETING_TEAM: 'error while deleting team'
}

const admin = {
    INVALID_CREDENTIALS: 'invalid credentials'
}

const errorCodes = {
    tournamentErrors,
    teamErrors,
    admin
}

export default errorCodes
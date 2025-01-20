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
    TOURNAMENT_DETAILS_ALREADY_EXIST: 'tournament details already exist, if you want you can update them',
    AN_ERROR_OCURRED_WHILE_GETTING_TOURNAMENTS: 'an error ocurred while getting tournaments',
    TOURNAMENT_NOT_FOUNDED: 'tournament not funded'
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
    INVALID_TEAM_PLACEHOLDER: 'invalid team placeholder',
    ERROR_WHILE_DELETING_TEAM: 'error while deleting team',
    INVALID_TEAM_SCORE: 'invalid team score',
    TEAM_ID_NOT_ALLOWED: 'team id not allowed'
}

const stageErrors = {
    ERROR_WHILE_GETTING_STAGES: 'error while getting stages',
    ERROR_WHILE_GETTING_KNOCKOUT_STAGES: 'error while getting knockout stages',
    STAGE_NAME_ALREADY_EXISTS: 'Stage name already exist',
    STAGE_ORDER_ALREADY_EXISTS: 'Stage order already exist',
    INVALID_STAGE_NAME: 'invalid stage name',
    INVALID_STAGE_TYPE: 'invalid stage type',
    ERROR_WHILE_CREATING_STAGE: 'error while creating stage',
    INVALID_STAGE_ORDER: 'invalid stage order',
    INVALID_STAGE_ID: 'invalid stage id',
    SELECTED_STAGE_DOES_NOT_EXIST: 'selected stage does not exist',
    ERROR_WHILE_DELETING_STAGE: 'error while deleting stage'
}

const groupErrors = {
    ERROR_WHILE_GETTING_GROUPS: 'error while getting groups',
    GROUP_NAME_RELATED_TO_THAT_STAGE_ALREADY_EXISTS: 'Group name related to that stage already exist',
    INVALID_GROUP_NAME: 'invalid group name',
    ERROR_WHILE_CREATING_GROUP: 'error while creating group',
    INVALID_GROUP_ID: 'invalid group id',
    INVALID_TEAMS_IDS_SELECTED: 'invalid teams ids selected',
    SELECTED_GROUP_DO_NOT_EXIST: 'selected group do not exist',
    SOME_TEAM_IS_ALREADY_ASSOCIATED_WITH_A_GROUP: 'some team is already associated with a group',
    ERROR_WHILE_UPDATING_TEAM: 'error while updating team',
    ERROR_WHILE_DELETING_GROUP: 'error while deleting group',
    ERROR_WHILE_UPDATING_GROUP_NAME: 'error while updating group name',
    NO_MATCHING_TEAM_AND_GROUP_FOUND: 'No matching team and group found'
}

const matchErrors = {
    SELECTED_MATCH_NOT_FOUND: 'selected match not found',
    ERROR_WHILE_VERIFYING_TEAMS: 'error while verifying teams',
    ERROR_WHILE_CREATING_MATCH: 'error while creating match',
    THIS_MATCH_ALREADY_EXIST: 'this match already exist',
    THIS_MATCH_DO_NOT_EXIST: 'this match do not exist',
    ERROR_WHILE_CHECKING_MATCH_DATA: 'error while checking match data',
    INVALID_DATE: 'invalid date',
    INVALID_TIME: 'invalid time',
    INVALID_MATCH_ID: 'invalid match id',
    SELECTED_MATCH_DOES_NOT_EXIST: 'selected match does not exist',
    ERROR_WHILE_DELETING_MATCH: 'error while deleting match',
    INVALID_LOCATION: 'invalid location',
    ERROR_WHILE_EDITING_MATCH: 'error while editing match'
}

const OAuthErrors = {
    SERVER_ERROR_GENERATING_TOKEN: 'server error generating token',
    INVALID_CREDENTIALS: 'invalid credentials. Please login...',
    TOKEN_HAS_EXPIRED: 'token has expired',
    UNKNOWN_ERROR_WHILE_VERIFYING_TOKEN: 'unknown error while verifying token',
    SERVER_ERROR_PROCCESING_PASSWORD: 'server error processing password',
    SERVER_ERROR_CHECKING_CREDENTIALS: 'server error checking credentials',
    ADMIN_USER_NOT_FOUND: 'admin user not found',
    USER_REGISTRATION_NOT_ALLOWED: 'user registration not allowed',
    EMAIL_NOT_VALID: 'email not valid',
    ERROR_WHILE_CREATING_USER: 'error while creating user',
    PASSWORD_NOT_VALID: 'password not valid',
    PASSWORD_INVALID_LENGTH: 'password invalid length',
    USER_ROLE_IS_NOT_DEFINED: 'user role is not defined. Please login...',
    CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
    PASSWORD_AND_CONFIRM_PASSWORD_DO_NOT_MATCH: 'Password and Confirm Password do not match'
}

const errorCodes = {
    tournamentErrors,
    teamErrors,
    stageErrors,
    groupErrors,
    matchErrors,
    OAuthErrors
}

export default errorCodes
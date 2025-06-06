const tournamentErrors = {
    INVALID_TOURNAMENT_NAME: 'invalid tournament name',
    TOURNAMENT_NAME_TOO_LONG: 'tournament name too long',
    TOURNAMENT_NAME_TOO_SHORT: 'tournament name too short',
    INVALID_TOURNAMENT_DATE: 'invalid tournament date',
    INVALID_TOURNAMENT_ID: 'invalid tournament id',
    TOURNAMENT_DATE_IS_MANDATORY: 'tournament date is mandatory',
    TOURNAMENT_DATE_MUST_BE_FUTURE: 'tournament date must be future',
    AN_ERROR_OCURRED_WHILE_CREATING_TOURNAMENT: 'an error ocurred while creating tournament',
    AN_ERROR_OCURRED_GETTING_TOURNAMENT_DETAILS: 'an error ocurred while getting tournament details',
    AN_ERROR_OCURRED_WHILE_UPDATING_TOURNAMENT: 'an error ocurred while updating tournament',
    AN_ERROR_OCURRED_WHILE_DELETING_TOURNAMENT: 'an error ocurred while deleting tournament',
    TOURNAMENT_DETAILS_ALREADY_EXIST: 'tournament details already exist, if you want you can update them',
    AN_ERROR_OCURRED_WHILE_GETTING_TOURNAMENTS: 'an error ocurred while getting tournaments',
    TOURNAMENT_NOT_FOUNDED: 'tournament not founded',
    IMAGE_NOT_VALID: 'Image(s) not valid',
    ERROR_WHILE_CHECKING_IMAGES: 'Error while checking images',
    ERROR_SAVING_IMAGE: 'Error while saving images(s)'
}

const teamErrors = {
    ERROR_WHILE_CREATING_TEAM: 'error while creating team',
    INVALID_TEAM_NAME: 'invalid team name',
    TEAM_NAME_TOO_LONG: 'team name too long',
    TEAM_NAME_TOO_SHORT: 'team name too short',
    INVALID_PLAYERS_LIST: 'invalid player list',
    TEAM_ALREADY_EXISTS: 'Team already exist',
    ERROR_WHILE_GETTING_TEAMS: 'error while getting teams',
    TEAM_NOT_FOUNDED: 'team not founded',
    ERROR_WHILE_UPDATING_TEAM: 'error while updating team',
    INVALID_TEAM_ID: 'invalid team id',
    INVALID_TEAM_PLACEHOLDER: 'invalid team placeholder',
    ERROR_WHILE_DELETING_TEAM: 'error while deleting team',
    INVALID_TEAM_SCORE: 'invalid team score',
    TEAM_ID_NOT_ALLOWED: 'team id not allowed',
    LOGO_IMAGE_NOT_VALID: 'logo image not valid',
    ERROR_WHILE_CHECKING_LOGO_IMAGE: 'error while ckeching logo image',
    ERROR_WHILE_SAVING_IMAGE: 'error while saving image'
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
    ERROR_WHILE_DELETING_STAGE: 'error while deleting stage',
    PLEASE_SET_POINTS_PER_MATCH_BEFORE_EDITING: 'please set points per match before editing',
    ERROR_WHILE_GETTING_STAGE_DATA: 'error while getting stage data',
    ERROR_WHILE_EDITING_STAGE: 'error while editing stage'
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
    ERROR_WHILE_EDITING_MATCH: 'error while editing match',
    YOU_MUST_DEFINE_BOTH_RESULTS: 'you must define both results',
    YOU_CANNOT_EDIT_A_MATCH_THAT_HAS_RESULT_DEFINED: 'you cannot edit a match that has result defined',
    MATCH_RESULT_MUST_BE_DEFINED_BEFORE_SETTING_PENALTY_RESULTS: 'match result must be defined before setting penalty results',
    CANNOT_DEFINE_PENALTY_IF_NO_DRAW: 'You cannot define the penalty result if the match result is not a draw',
    YOU_MUST_DEFINE_PENALTY_SCORES_IF_IT_IS_A_DRAW: 'You must define penalty scores if it is a draw',
    PENALTY_RESULT_MUST_BE_DIFFERENT: 'penalty result must be different',
    RESULTS_MUST_BE_0_OR_GREATER: 'Results must be 0 or greater',
    DEFINE_THE_TEAMS_BEFORE_SETTING_THE_RESULTS: 'define the teams before setting the results',
    TEMAS_CAN_NOT_BE_THE_SAME_TO_MAKE_A_MATCH: 'Teams can not be the same to make a match',
    YOU_MUST_DEFINE_PENALTY_RESULTS_IF_MATCH_RESULT_IS_A_DRAW: 'You must define penalty results if match result is a draw'
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

const videoErrors = {
    INVALID_STRING_VALUE: 'invalid string value',
    A_REQUIRED_VALUE_NOT_EXIST: 'a required value not exist',
    INVALID_VIDEO_ID: 'invalid video id',
    VIDEO_NOT_FOUNDED: 'video not founded',
    ERROR_WHILE_CREATING_VIDEO: 'error while creating video',
    ERROR_WHILE_SAVING_IMAGE: 'error while saving image',
    ERROR_WHILE_DELETING_VIDEO: 'error while deleting video',
    ERROR_WHILE_GETTING_VIDEOS: 'error while getting videos'
}

const contactErrors = {
    INVALID_EMAILS_LIST: 'invalid emails list',
    INVALID_EMAIL_FORMAT: 'invalid email format',
    INVALID_PHONE_NUMBER: 'invalid phone number',
    REMOVED_EMAILS_NOT_FOUND: 'removed emails not found',
    SOME_EMAIL_ALREADY_EXIST: 'some email already exist',
    AN_ERROR_OCURRED_WHILE_UPDATING_EMAILS: 'an error ocurred while updating emails',
    AN_ERROR_OCURRED_WHILE_SENDING_EMAIL: 'an error ocurred while updating emails',
    NAME_IS_REQUIRED: 'Name is required',
    NAME_MUST_BE_AT_LEAST_3_CHARACTERS_LONG: 'Name must be at least 3 characters long',
    EMAIL_IS_REQUIRED: 'Email is required',
    INVALID_EMAIL: 'Invalid email',
    SUBJECT_IS_REQUIRED: 'Subject is required',
    EMAIL_MESSAGE_IS_REQUIRED: 'Email message is required',
    EMAIL_MASSAGE_TOO_LONG: 'Email massage too long. Maximum 2000 characters allowed',
    AN_ERROR_OCURRED_WHILE_SETTING_CONTACT_DETAILS: 'An error ocurred while setting contact details'
}

const errorCodes = {
    tournamentErrors,
    teamErrors,
    videoErrors,
    stageErrors,
    groupErrors,
    matchErrors,
    OAuthErrors,
    contactErrors
}

export default errorCodes
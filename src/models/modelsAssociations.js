import { Team } from './teamModel.js'
import { Player } from './playerModel.js'
import { Stage } from './stageModel.js'
import { Group } from './groupModel.js'
import { Match } from './matchModel.js'
import { TeamGroup } from './teamGroupModel.js'
import { TournamentDetails } from './tournamentDetailsModel.js'

export const modelsAssociations = () => {
    // Relación entre TournamentDetails y Team
    TournamentDetails.hasMany(Team, { foreignKey: 'tournamentId', onDelete: 'CASCADE' })
    Team.belongsTo(TournamentDetails, { foreignKey: 'tournamentId' })

    // Relación entre TournamentDetails y Stage
    TournamentDetails.hasMany(Stage, { foreignKey: 'tournamentId', onDelete: 'CASCADE' })
    Stage.belongsTo(TournamentDetails, { foreignKey: 'tournamentId' })

    // Relación entre TournamentDetails y Match
    TournamentDetails.hasMany(Match, { foreignKey: 'tournamentId', onDelete: 'CASCADE' })
    Match.belongsTo(TournamentDetails, { foreignKey: 'tournamentId' })

    // Relación entre TournamentDetails y Group
    TournamentDetails.hasMany(Group, { foreignKey: 'tournamentId', onDelete: 'CASCADE' })
    Group.belongsTo(TournamentDetails, { foreignKey: 'tournamentId' })

    // Relación entre Team y Player
    Team.hasMany(Player, { foreignKey: 'teamId', onDelete: 'CASCADE' })
    Player.belongsTo(Team, { foreignKey: 'teamId' })

    // Relación entre Stage y Group
    Stage.hasMany(Group, { foreignKey: 'stageId', onDelete: 'CASCADE' })
    Group.belongsTo(Stage, { foreignKey: 'stageId' })

    // Relación entre Match y Team (local y visitante)
    Team.hasMany(Match, { as: 'LocalMatches', foreignKey: 'localTeamId', onDelete: 'CASCADE' })
    Team.hasMany(Match, { as: 'VisitorMatches', foreignKey: 'visitorTeamId', onDelete: 'CASCADE' })
    Match.belongsTo(Team, { as: 'LocalTeam', foreignKey: 'localTeamId' })
    Match.belongsTo(Team, { as: 'VisitorTeam', foreignKey: 'visitorTeamId' })

    // Relación entre Stage y Match
    Stage.hasMany(Match, { foreignKey: 'stageId', onDelete: 'CASCADE' })
    Match.belongsTo(Stage, { foreignKey: 'stageId' })

    // Relación entre Team y Group a través de TeamGroup
    Team.belongsToMany(Group, { through: TeamGroup, foreignKey: 'teamId', otherKey: 'groupId', onDelete: 'CASCADE' })
    Group.belongsToMany(Team, { through: TeamGroup, foreignKey: 'groupId', otherKey: 'teamId', onDelete: 'CASCADE' })

    // Relación directa para acceder al equipo desde TeamGroup
    TeamGroup.belongsTo(Team, { foreignKey: 'teamId' })
    Team.hasMany(TeamGroup, { foreignKey: 'teamId' })

    // Relación directa para acceder al grupo desde TeamGroup
    TeamGroup.belongsTo(Group, { foreignKey: 'groupId' })
    Group.hasMany(TeamGroup, { foreignKey: 'groupId' })
}
import { Team } from './teamModel.js'
import { Player } from './playerModel.js'
import { Stage } from './stageModel.js'
import { Group } from './groupModel.js'
import { Match } from './matchModel.js'
import { TeamGroup } from './teamGroupModel.js'
import { Tournament } from './tournamentModel.js'

export const modelsAssociations = () => {
    Tournament.hasMany(Team, { foreignKey: 'tournamentId', onDelete: 'CASCADE' })
    Team.belongsTo(Tournament, { foreignKey: 'tournamentId' })

    Tournament.hasMany(Stage, { foreignKey: 'tournamentId', onDelete: 'CASCADE' })
    Stage.belongsTo(Tournament, { foreignKey: 'tournamentId' })

    Team.hasMany(Player, { foreignKey: 'teamId', onDelete: 'CASCADE' })
    Player.belongsTo(Team, { foreignKey: 'teamId' })

    Stage.hasMany(Group, { foreignKey: 'stageId', onDelete: 'CASCADE' })
    Group.belongsTo(Stage, { foreignKey: 'stageId' })

    Team.hasMany(Match, { as: 'LocalMatches', foreignKey: 'localTeamId', onDelete: 'CASCADE' })
    Team.hasMany(Match, { as: 'VisitorMatches', foreignKey: 'visitorTeamId', onDelete: 'CASCADE' })
    Match.belongsTo(Team, { as: 'LocalTeam', foreignKey: 'localTeamId' })
    Match.belongsTo(Team, { as: 'VisitorTeam', foreignKey: 'visitorTeamId' })

    Stage.hasMany(Match, { foreignKey: 'stageId', onDelete: 'CASCADE' })
    Match.belongsTo(Stage, { foreignKey: 'stageId' })

    Team.belongsToMany(Group, { through: TeamGroup, foreignKey: 'teamId', otherKey: 'groupId', onDelete: 'CASCADE' })
    Group.belongsToMany(Team, { through: TeamGroup, foreignKey: 'groupId', otherKey: 'teamId', onDelete: 'CASCADE' })

    TeamGroup.belongsTo(Team, { foreignKey: 'teamId', onDelete: 'CASCADE' })
    Team.hasMany(TeamGroup, { foreignKey: 'teamId' })

    TeamGroup.belongsTo(Group, { foreignKey: 'groupId', onDelete: 'CASCADE' })
    Group.hasMany(TeamGroup, { foreignKey: 'groupId' })

    TeamGroup.belongsTo(Match, { foreignKey: 'matchId', onDelete: 'CASCADE' })
    Match.hasMany(TeamGroup, { foreignKey: 'matchId' })
}
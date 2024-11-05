// models/associations.js
import { Team } from './teamModel.js'
import { Player } from './playerModel.js'

export const modelsAssociations = () => {
    Team.hasMany(Player, {
        foreignKey: 'teamId',
        onDelete: 'CASCADE'
    })
    Player.belongsTo(Team, {
        foreignKey: 'teamId'
    })
}
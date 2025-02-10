'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
    // Eliminar la columna 'logoUrl' de la tabla 'Team'
        await queryInterface.removeColumn('TeamGroups', 'matchId')
    }
}
import { sequelize } from '../database/connection.js'
import { DataTypes } from 'sequelize'
import logger from '../utils/logger.js'

export const TournamentDate = sequelize.define('TournamentDate', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
})

// Sincronizar el modelo con la base de datos
await sequelize.sync({ alter: true })
    .then(() => {
        logger.info('TournamenteDate synchronized')
    })
    .catch(err => {
        logger.error('Error when synchronizing TournamenteDate:', err)
    })

// Función para crear o actualizar el registro de la fecha de inicio
// export const setTournamentStartDate = async(startDate, name) => {
//     try {
//         const [startingTime, created] = await StartingTime.upsert({
//             startDate,
//             name
//         }, {
//             returning: true
//         })

//         if (created) {
//             logger.info('StartingTime created:', startingTime)
//         } else {
//             logger.info('StartingTime updated:', startingTime)
//         }
//     } catch (err) {
//         logger.error('Error while setting tournament start date:', err)
//     }
// }
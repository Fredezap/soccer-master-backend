import { Team } from '../../../../models/teamModel.js'
import { Stage } from '../../../../models/stageModel.js'
import { Match } from '../../../../models/matchModel.js'

// todo: Ver si esto me sirve, que me devuelve
// todo: Crear el router para matches, ver si va por ahi
// todo: Ver en el front si realmente recibiendo esto va bien.
// todo: ANTES QUE NADA. QUE CONSULTA DATOS NECESITABA EN LAS BRACKETS PARA QUE FUNCIONEN? TENIA DATOS DE PRUEBA.
const getAllMatchesByDate = async() => {
    try {
        const matches = await Match.findAll({
            include: [
                {
                    model: Team,
                    as: 'localTeam',
                    attributes: ['teamId', 'name']
                },
                {
                    model: Team,
                    as: 'visitorTeam',
                    attributes: ['teamId', 'name']
                },
                {
                    model: Stage,
                    as: 'stage',
                    attributes: ['stageId', 'name']
                }
            ],
            order: [['date', 'ASC']]
        })

        const groupedByDate = matches.reduce((acc, match) => {
            const matchDate = match.date.toISOString().split('T')[0]
            if (!acc[matchDate]) {
                acc[matchDate] = []
            }
            acc[matchDate].push(match)
            return acc
        }, {})

        console.log(groupedByDate)
        return groupedByDate
    } catch (error) {
        console.error('Error al obtener los partidos por fecha:', error)
        throw error
    }
}

const matchService = {
    getAllMatchesByDate
}

export default matchService
import { Team } from '../../../../models/teamModel.js'
import { Stage } from '../../../../models/stageModel.js'
import { Match } from '../../../../models/matchModel.js'

// todo: Ver si esto me sirve, que me devuelve
// todo: Crear el router para matches, ver si va por ahi
// todo: Ver en el front si realmente recibiendo esto va bien.
// todo: ANTES QUE NADA. QUE CONSULTA DATOS NECESITABA EN LAS BRACKETS PARA QUE FUNCIONEN? TENIA DATOS DE PRUEBA.

const create = async(values) => {
    const { stageId, localTeamId, visitorTeamId, date, time, location } = values

    const newMatch = await Match.create({
        stageId,
        localTeamId,
        visitorTeamId,
        date,
        time,
        location
    })

    return newMatch
}

const checkIfMatchExists = async(stageId, localTeamId, visitorTeamId, date, time) => {
    try {
        const match = await Match.findOne({
            where: {
                stageId,
                localTeamId,
                visitorTeamId,
                date,
                time
            }
        })

        if (match) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false }
    }
}

const getAllMatchesByDate = async() => {
    // eslint-disable-next-line no-useless-catch
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

        return groupedByDate
    } catch (error) {
        throw error
    }
}

const getOneById = async(id) => {
    return Match.findByPk(id)
}

const destroy = async({ matchId }) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const result = await Match.destroy({
            where: { matchId }
        })

        if (result === 0) {
            throw new Error(`Match with ID ${matchId} not found`)
        }

        return result
    } catch (error) {
        throw error
    }
}

const matchService = {
    create,
    getAllMatchesByDate,
    checkIfMatchExists,
    getOneById,
    destroy
}

export default matchService
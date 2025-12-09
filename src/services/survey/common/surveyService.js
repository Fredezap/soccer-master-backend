import { MVPSurvey } from '../../../models/MVPSurveyModel.js'
import { MVPVotes } from '../../../models/MVPVotesModel.js'
import { Player } from '../../../models/playerModel.js'
import { Team } from '../../../models/teamModel.js'

// MVP Votes service
const create = async({ userIp, tournamentId, playerId }) => {
    const data = { userIp, tournamentId, playerId }
    return await MVPVotes.create(data)
}

const findByIpAndTournament = async(userIp, tournamentId) => {
    return await MVPVotes.findOne({
        where: { userIp, tournamentId }
    })
}

// todo: BACKEND
// todo: en back chequear si se elimina jugador y coincide con mvp del torneo, que hago? lo seteo en Null al MVP y demas?

const getVotesByTournament = async(tournamentId) => {
    return await MVPVotes.findAll({
        where: { tournamentId },

        attributes: [
            'playerId',
            [
                MVPVotes.sequelize.fn(
                    'COUNT',
                    MVPVotes.sequelize.col('MVPVotes.playerId')
                ),
                'totalVotes'
            ]
        ],

        include: [
            {
                model: Player,
                attributes: ['name'],
                include: [
                    {
                        model: Team,
                        attributes: ['name']
                    }
                ]
            }
        ],

        group: [
            'MVPVotes.playerId',
            'Player.playerId',
            'Player.Team.teamId'
        ]
    })
}

// MVP Survey service
const updateMVPSurvey = async(mvpSurveyId, { updatedFields }) => {
    console.log('UPDATED FIELDS: ', updatedFields)
    const a = await MVPSurvey.update(updatedFields, {
        where: { mvpSurveyId }
    })
    // console.log('UPDATE:', a)
}

const findByIdMVPSurvey = async(mvpSurveyId) => {
    return await MVPSurvey.findOne({
        where: { mvpSurveyId }
    })
}

const createMVPSurvey = async({ tournamentId }) => {
    console.log(tournamentId)
    return await MVPSurvey.create({ tournamentId })
}

const surveyService = {
    create,
    findByIpAndTournament,
    getVotesByTournament,
    updateMVPSurvey,
    findByIdMVPSurvey,
    createMVPSurvey
}

export default surveyService
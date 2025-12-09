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
        where: { userIp, tournamentId, deleted: false }
    })
}

// todo: BACKEND
// todo: en back chequear si se elimina jugador y coincide con mvp del torneo, que hago? lo seteo en Null al MVP y demas?

const getVotesByTournament = async(tournamentId) => {
    return await MVPVotes.findAll({
        where: { tournamentId, deleted: false },
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
                where: { deleted: false }, // si Player también tiene deleted
                include: [
                    {
                        model: Team,
                        attributes: ['name'],
                        where: { deleted: false } // si Team también tiene deleted
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
    return await MVPSurvey.update(updatedFields, {
        where: { mvpSurveyId }
    })
}

const findByIdMVPSurvey = async(mvpSurveyId) => {
    return await MVPSurvey.findOne({
        where: { mvpSurveyId, deleted: false }
    })
}

const createMVPSurvey = async({ tournamentId }) => {
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
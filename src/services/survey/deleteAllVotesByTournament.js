import { MVPVotes } from '../../models/MVPVotesModel.js'
import { MVPSurvey } from '../../models/MVPSurveyModel.js'

const deleteAllVotesByTournament = async(req, res) => {
    const { tournamentId } = req.body

    if (!tournamentId) {
        return res.status(400).json({
            errors: [{ msg: 'TOURNAMENT_ID_REQUIRED' }]
        })
    }

    const transaction = await MVPVotes.sequelize.transaction()

    try {
        // 1) Marcar todos los MVPVotes como deleted
        await MVPVotes.update(
            { deleted: true },
            {
                where: { tournamentId },
                transaction
            }
        )

        // 2) Obtener encuesta MVP
        const survey = await MVPSurvey.findOne({
            where: { tournamentId },
            transaction
        })

        if (!survey) {
            throw new Error('MVPSurvey not found')
        }

        // 3) Resetear encuesta MVP
        await MVPSurvey.update(
            {
                showMVP: false,
                votingIsAvaliable: false,
                playerId: null
            },
            {
                where: { mvpSurveyId: survey.mvpSurveyId },
                transaction
            }
        )

        // ✅ Commit
        await transaction.commit()

        return res.status(200).json({ ok: true })
    } catch (err) {
        // ❌ Rollback
        await transaction.rollback()

        return res.status(500).json({
            errors: [{ msg: 'ERROR_DELETE_ALL_VOTES' }]
        })
    }
}

export default deleteAllVotesByTournament
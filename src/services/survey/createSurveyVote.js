import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import surveyService from './common/surveyService.js'

const { ERROR_WHILE_CREATING_VOTE, ERROR_VOTE_ALREADY_EXISTS } = errorCodes.mvpErrors

const CreateSurveyVote = async(req, res) => {
    let errors

    try {
        const { tournamentId, playerId } = req.body
        const userIp = (Math.floor(Math.random() * 1000000) + 1).toString()

        // Validar si ya votó esa IP para ese torneo
        const alreadyVoted = await surveyService.findByIpAndTournament(userIp, tournamentId)
        if (alreadyVoted) {
            errors = [{ msg: ERROR_VOTE_ALREADY_EXISTS }]

            return res.status(StatusCodes.BAD_REQUEST).json({ errors })
        }
        // Crear voto
        await surveyService.create({ tournamentId, playerId, userIp })

        return res
            .status(StatusCodes.CREATED)
            .json({})
    } catch (err) {
        errors = [{ msg: ERROR_WHILE_CREATING_VOTE }]
        return res
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json({
                errors: [{ errors }]
            })
    }
}

export default CreateSurveyVote
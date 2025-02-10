import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import matchService from './common/matchService.js'

const {
    ERROR_WHILE_EDITING_MATCH,
    YOU_MUST_DEFINE_BOTH_RESULTS,
    MATCH_RESULT_MUST_BE_DEFINED_BEFORE_SETTING_PENALTY_RESULTS,
    ERROR_CANNOT_DEFINE_PENALTY_IF_NO_DRAW,
    PENALTY_RESULT_MUST_BE_DIFFERENT
} = errorCodes.matchErrors

const editMatch = async(req, res) => {
    const values = req.body
    const { localTeamScore, visitorTeamScore, visitorTeamPenaltyScore, localTeamPenaltyScore } = values
    // chequemos los resultados del partido recibidos

    // chequeamos que esten definidos ambos resultados o sean null (localTeamScore y visitorTeamScore)
    const currentResultsNotValid =
        (localTeamScore === null || localTeamScore === undefined || localTeamScore === '') !==
        (visitorTeamScore === null || visitorTeamScore === undefined || visitorTeamScore === '')

    if (currentResultsNotValid) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: [{ msg: YOU_MUST_DEFINE_BOTH_RESULTS }] })
    }

    // chequeamos que esten definidos ambos resultados de penales o sean null (localTeamPenaltyScore y visitorTeamPenaltyScore)
    const currentPenaltyResultsNotValid =
    (localTeamPenaltyScore === null || localTeamPenaltyScore === undefined || localTeamPenaltyScore === '') !==
    (visitorTeamPenaltyScore === null || visitorTeamPenaltyScore === undefined || visitorTeamPenaltyScore === '')

    if (currentPenaltyResultsNotValid) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: [{ msg: YOU_MUST_DEFINE_BOTH_RESULTS }] })
    }

    // chequeamos que si estar definido el resultado de penales, el resultado del partido sea un empate
    const penaltyJustValidIfMatchResultIsADraw = localTeamScore === visitorTeamScore
    if (!penaltyJustValidIfMatchResultIsADraw) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: [{ msg: ERROR_CANNOT_DEFINE_PENALTY_IF_NO_DRAW }]
        })
    }

    // chequeamos que no pueda estar definido resultado de penales, sin que este definido el resultado del partido
    const penaltyNotDefinedIfNotMatchResult =
    (!localTeamScore || !visitorTeamScore) && (localTeamPenaltyScore || visitorTeamPenaltyScore)

    if (penaltyNotDefinedIfNotMatchResult) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: [{ msg: MATCH_RESULT_MUST_BE_DEFINED_BEFORE_SETTING_PENALTY_RESULTS }]
        })
    }

    // chequeamos que el resultado de los penales sea distinto
    const penaltyResultMustBeDifferent = localTeamPenaltyScore !== visitorTeamPenaltyScore

    if (!penaltyResultMustBeDifferent) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            errors: [{ msg: PENALTY_RESULT_MUST_BE_DIFFERENT }]
        })
    }

    try {
        await matchService.edit({ values })
        return res.status(StatusCodes.OK).json()
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_EDITING_MATCH }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default editMatch
import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../constants/errors/errorCodes.js'
import teamService from './common/teamService.js'
import { Team } from '../../models/teamModel.js'
import { TeamGroup } from '../../models/teamGroupModel.js'
import { Match } from '../../models/matchModel.js'
import { Group } from '../../models/groupModel.js'
import { Op } from 'sequelize'
import { Stage } from '../../models/stageModel.js'

const { ERROR_WHILE_DELETING_TEAM, THIS_TEAM_HAS_ASSOCIATED_MATCHES_TO_A_GROUP } = errorCodes.teamErrors

async function hasMatchesInGroup(teamId) {
    const count = await Match.count({
        distinct: true, // avoid counting same match more times
        col: 'matchId',
        where: {
            [Op.or]: [
                { localTeamId: teamId },
                { visitorTeamId: teamId }
            ],
            deleted: false
        },
        include: [
            {
                model: Stage,
                required: true,
                where: { deleted: false },
                include: [
                    {
                        model: Group,
                        required: true,
                        where: { deleted: false }
                    }
                ]
            }
        ]
    })

    return count > 0
}

const deleteTeam = async(req, res) => {
    const { teamId } = req.body.team
    let errors
    try {
        const checkMatchesInGroup = await hasMatchesInGroup(teamId)

        if (checkMatchesInGroup) {
            errors = [{ msg: THIS_TEAM_HAS_ASSOCIATED_MATCHES_TO_A_GROUP }]
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
        }
        await teamService.destroy({ teamId })
        return res.status(StatusCodes.OK).json()
    } catch (err) {
        errors = [{ msg: ERROR_WHILE_DELETING_TEAM }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default deleteTeam
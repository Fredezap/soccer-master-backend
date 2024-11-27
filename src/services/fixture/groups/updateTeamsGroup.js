import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import groupService from './common/groupService.js'
import teamService from '../../teams/common/teamService.js'

const updateTeamsGroup = async(req, res) => {
    const { ERROR_WHILE_UPDATING_TEAM, SOME_TEAM_IS_ALREADY_ASSOCIATED_WITH_A_GROUP } = errorCodes.groupErrors
    try {
        const { group, selectedTeamIds, stageId } = req.body

        const availableTeamIds = (await groupService.getAvailableTeams(stageId)).map(team => team.teamId)

        const isTeamAssociatedToAnyGroup = selectedTeamIds.some(
            teamId => !availableTeamIds.includes(teamId)
        )

        if (isTeamAssociatedToAnyGroup) {
            const errors = [{ msg: SOME_TEAM_IS_ALREADY_ASSOCIATED_WITH_A_GROUP }]
            return res.status(StatusCodes.BAD_REQUEST).json({ errors })
        }

        await groupService.updateTeamsGroup(group, selectedTeamIds)
        return res.status(StatusCodes.OK).json({ success: true })
    } catch (error) {
        const errors = [{ msg: ERROR_WHILE_UPDATING_TEAM }]
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors })
    }
}

export default updateTeamsGroup
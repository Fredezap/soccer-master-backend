import { TeamGroup } from '../../../../models/teamGroupModel.js'

const getOneByGroupIdAndTeamId = async({ groupId, teamId }) => {
    return TeamGroup.findOne({
        where: { groupId, teamId }
    })
}

async function updateTeamGroup(teamGroupId, values, transaction) {
    // eslint-disable-next-line no-useless-catch
    try {
        const result = await TeamGroup.update(values, {
            where: { teamGroupId },
            transaction
        })
        return result // [affectedCount]
    } catch (error) {
        throw error
    }
}

const teamGroupService = {
    getOneByGroupIdAndTeamId,
    updateTeamGroup
}

export default teamGroupService
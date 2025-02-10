import { TeamGroup } from '../../../../models/teamGroupModel.js'

const getOneByGroupIdAndTeamId = async({ groupId, teamId }) => {
    return TeamGroup.findOne({
        where: { groupId, teamId }
    })
}

async function updateTeamGroup(teamGroupId, values, transaction) {
    await TeamGroup.update(values, {
        where: { teamGroupId },
        transaction
    })
};

const teamGroupService = {
    getOneByGroupIdAndTeamId,
    updateTeamGroup
}

export default teamGroupService
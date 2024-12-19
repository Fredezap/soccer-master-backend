/* eslint-disable no-useless-catch */
import { Op } from 'sequelize'
import { Group } from '../../../../models/groupModel.js'
import { Team } from '../../../../models/teamModel.js'
import { TeamGroup } from '../../../../models/teamGroupModel.js'
import { Stage } from '../../../../models/stageModel.js'
import errorCodes from '../../../../constants/errors/errorCodes.js'
const { NO_MATCHING_TEAM_AND_GROUP_FOUND } = errorCodes.groupErrors

const create = async(data) => {
    const { name, stageId } = data

    try {
        const response = await Group.create(
            {
                name,
                stageId
            }
        )

        return response
    } catch (error) {
        throw error
    }
}

const getAllGroupsWithTeams = async() => {
    try {
        const groups = await Group.findAll({
            include: [
                {
                    model: Team,
                    through: { attributes: [] }
                },
                {
                    model: Stage,
                    attributes: ['stageId', 'name']
                }
            ]
        })

        const groupedByStageId = groups.reduce((acc, group) => {
            const { stageId, name } = group.Stage
            if (!acc[stageId]) {
                acc[stageId] = { name, groups: [] }
            }
            acc[stageId].groups.push(group)
            return acc
        }, {})

        return groupedByStageId
    } catch (error) {
        throw error
    }
}

async function getOneByNameAndStageId(name, stageId) {
    return Group.findOne({ where: { name, stageId } })
}

async function getOneById(groupId) {
    return Group.findOne({ where: { groupId } })
}

async function updateGroupName(groupId, name) {
    try {
        await Group.update(
            { name },
            { where: { groupId } }
        )
    } catch (error) {
        throw error
    }
}

async function updateTeamsGroup(group, selectedTeamIds) {
    try {
        await group.addTeams(selectedTeamIds)
    } catch (error) {
        throw error
    }
}

async function deleteTeamGroupRecord(groupId, teamId) {
    try {
        const result = await TeamGroup.destroy({
            where: {
                groupId,
                teamId
            }
        })

        if (result === 0) {
            return { success: false, error: NO_MATCHING_TEAM_AND_GROUP_FOUND }
        } else {
            return { success: true, result }
        }
    } catch (error) {
        throw error
    }
}

async function deleteGroup(groupId) {
    try {
        await Group.destroy({ where: { groupId } })
    } catch (error) {
        throw error
    }
}

async function getAvailableTeams(stageId) {
    try {
        const allocatedTeamIds = await TeamGroup.findAll({
            attributes: ['teamId'],
            include: [
                {
                    model: Group,
                    attributes: [],
                    where: { stageId }
                }
            ],
            raw: true
        }).then(records => records.map(record => record.teamId))

        const availableTeams = await Team.findAll({
            where: {
                teamId: { [Op.notIn]: allocatedTeamIds }
            }
        })

        return availableTeams
    } catch (error) {
        return []
    }
}

const checkIfTeamsExistInSameGroup = async(localTeamId, visitorTeamId, groupId) => {
    try {
        const teamIds = [localTeamId, visitorTeamId]

        const matchingTeams = await TeamGroup.findAll({
            where: {
                teamId: teamIds,
                groupId
            }
        })

        const foundTeamIds = matchingTeams.map(record => record.teamId)
        const allTeamsExist = teamIds.every(id => foundTeamIds.includes(id))

        if (allTeamsExist) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false }
    }
}

const groupService = {
    create,
    getAllGroupsWithTeams,
    getOneByNameAndStageId,
    getOneById,
    updateTeamsGroup,
    getAvailableTeams,
    deleteGroup,
    updateGroupName,
    deleteTeamGroupRecord,
    checkIfTeamsExistInSameGroup
}

export default groupService
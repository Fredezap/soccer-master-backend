import { Op } from 'sequelize'
import { Group } from '../../../../models/groupModel.js'
import { Team } from '../../../../models/teamModel.js'
import { TeamGroup } from '../../../../models/teamGroupModel.js'
import { Stage } from '../../../../models/stageModel.js'
import errorCodes from '../../../../constants/errors/errorCodes.js'
import { Match } from '../../../../models/matchModel.js'
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
        console.error('Error creating group:', error)
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

        // Agrupar los grupos por stageId, incluyendo el nombre de la stage
        const groupedByStageId = groups.reduce((acc, group) => {
            const { stageId, name } = group.Stage // Obtiene el stageId y el nombre de la stage
            if (!acc[stageId]) {
                acc[stageId] = { name, groups: [] }
            }
            acc[stageId].groups.push(group)
            return acc
        }, {})

        console.log(groupedByStageId)
        return groupedByStageId
    } catch (error) {
        console.error('Error al obtener los grupos con equipos:', error)
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
        console.log('Group name updated successfully')
    } catch (error) {
        console.error('Error updating group name:', error)
        throw error
    }
}

async function updateTeamsGroup(group, selectedTeamIds) {
    try {
        await group.addTeams(selectedTeamIds)
    } catch (error) {
        console.error('Error updating teams in group:', error)
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
        console.log('result: ', result)
        if (result === 0) {
            return { success: false, error: NO_MATCHING_TEAM_AND_GROUP_FOUND }
        } else {
            return { success: true, result }
        }
    } catch (error) {
        console.error('Error deleting record from TeamGroup:', error)
        throw error
    }
}

async function deleteGroup(groupId) {
    try {
        await Group.destroy({ where: { groupId } })
    } catch (error) {
        console.error('Error deleting group:', error)
        throw error
    }
}

async function getAvailableTeams(stageId) {
    try {
        // Obtener los IDs de los equipos ya asignados a grupos en la stage especificada
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

        console.log('ALLOCATED TEAMS: ', allocatedTeamIds)

        // Obtener equipos que no están en los grupos asignados de la stage especificada
        const availableTeams = await Team.findAll({
            where: {
                teamId: { [Op.notIn]: allocatedTeamIds }
            }
        })

        return availableTeams
    } catch (error) {
        console.error('Error fetching available teams:', error)
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
        console.error('Error verificando equipos en el grupo:', error)
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
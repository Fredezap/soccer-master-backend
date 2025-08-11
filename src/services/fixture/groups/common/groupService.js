/* eslint-disable no-useless-catch */
import { Op } from 'sequelize'
import { Group } from '../../../../models/groupModel.js'
import { Team } from '../../../../models/teamModel.js'
import { TeamGroup } from '../../../../models/teamGroupModel.js'
import { Stage } from '../../../../models/stageModel.js'
import errorCodes from '../../../../constants/errors/errorCodes.js'
import { Match } from '../../../../models/matchModel.js'
const { NO_MATCHING_TEAM_AND_GROUP_FOUND, YOU_CAN_NOT_DELETE_A_TEAM_THAT_HAS_MATCH_RESULTS_DEFINED_IN_THE_GROUP } = errorCodes.groupErrors

const create = async(data) => {
    const { name, stageId } = data

    try {
        const response = await Group.create({
            name,
            stageId
        })

        return response
    } catch (error) {
        throw error
    }
}

const getAllGroupsWithTeams = async() => {
    try {
        const groups = await Group.findAll({
            where: { deleted: false },
            include: [
                {
                    model: Team,
                    where: { deleted: false },
                    through: { attributes: [] }
                },
                {
                    model: Stage,
                    attributes: ['stageId', 'name'],
                    where: { deleted: false }
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

const getAllGroupsWithTeamsByTournament = async(tournamentId) => {
    try {
        const groups = await Group.findAll({
            where: { deleted: false },
            include: [
                {
                    model: Stage.scope('withDeleted'),
                    required: true,
                    where: {
                        tournamentId,
                        deleted: false
                    }
                },
                {
                    model: Team,
                    required: false,
                    where: { deleted: false },
                    through: {
                        where: {
                            deleted: false // TeamGroup no eliminados
                        }
                    }
                }
            ]
        })

        const groupedByStageId = groups.reduce((acc, group) => {
            const { stageId } = group.Stage
            if (!acc[stageId]) {
                acc[stageId] = { Stage: group.Stage, groups: [] }
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
    return Group.findOne({
        where: {
            name,
            stageId,
            deleted: false
        }
    })
}

async function getOneById(groupId) {
    return Group.findOne({
        where: {
            groupId,
            deleted: false
        }
    })
}

async function updateGroupName(groupId, name) {
    try {
        await Group.update(
            { name },
            { where: { groupId, deleted: false } }
        )
    } catch (error) {
        throw error
    }
}

async function updateTeamsGroup(group, selectedTeamIds) {
    try {
        // Agregar solo equipos que no estén eliminados
        const validTeamIds = await Team.findAll({
            where: {
                teamId: selectedTeamIds,
                deleted: false
            },
            attributes: ['teamId'],
            raw: true
        }).then(records => records.map(r => r.teamId))

        await group.addTeams(validTeamIds)
    } catch (error) {
        throw error
    }
}

async function deleteTeamGroupAndRelatedMatches(groupId, teamId) {
    const transaction = await TeamGroup.sequelize.transaction()
    try {
        const result = await TeamGroup.update(
            { deleted: true },
            {
                where: { groupId, teamId, deleted: false },
                transaction
            }
        )

        if (result[0] === 0) {
            await transaction.rollback()
            return { success: false, error: NO_MATCHING_TEAM_AND_GROUP_FOUND }
        }

        const matches = await Match.findAll({
            where: {
                deleted: false,
                [Op.or]: [{ localTeamId: teamId }, { visitorTeamId: teamId }]
            },
            include: [
                {
                    model: Team,
                    as: 'LocalTeam',
                    required: false,
                    include: [
                        {
                            model: Group,
                            where: { groupId, deleted: false },
                            required: true,
                            through: { attributes: [] }
                        }
                    ]
                },
                {
                    model: Team,
                    as: 'VisitorTeam',
                    required: false,
                    include: [
                        {
                            model: Group,
                            where: { groupId, deleted: false },
                            required: true,
                            through: { attributes: [] }
                        }
                    ]
                }
            ],
            transaction
        })

        // ❗ Validar que no haya resultados definidos
        const hasResultDefined = matches.some(match =>
            match.localTeamScore !== null || match.visitorTeamScore !== null
        )

        if (hasResultDefined) {
            await transaction.rollback()
            return {
                success: false,
                error: YOU_CAN_NOT_DELETE_A_TEAM_THAT_HAS_MATCH_RESULTS_DEFINED_IN_THE_GROUP
            }
        }

        // 3. Eliminar partidos
        const matchIdsToDelete = matches.map(m => m.matchId)
        if (matchIdsToDelete.length > 0) {
            await Match.update(
                { deleted: true },
                {
                    where: {
                        matchId: { [Op.in]: matchIdsToDelete }
                    },
                    transaction
                }
            )
        }

        await transaction.commit()
        return { success: true, deletedMatches: matchIdsToDelete }
    } catch (error) {
        await transaction.rollback()
        throw error
    }
}

async function deleteGroup(groupId) {
    try {
        await Group.update(
            { deleted: true },
            {
                where: { groupId, deleted: false }
            }
        )
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
                    where: { stageId, deleted: false }
                }
            ],
            where: { deleted: false },
            raw: true
        }).then(records => records.map(record => record.teamId))

        const availableTeams = await Team.findAll({
            where: {
                teamId: { [Op.notIn]: allocatedTeamIds },
                deleted: false
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
                groupId,
                deleted: false
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
    getAllGroupsWithTeamsByTournament,
    getOneByNameAndStageId,
    getOneById,
    updateTeamsGroup,
    getAvailableTeams,
    deleteGroup,
    updateGroupName,
    deleteTeamGroupAndRelatedMatches,
    checkIfTeamsExistInSameGroup
}

export default groupService
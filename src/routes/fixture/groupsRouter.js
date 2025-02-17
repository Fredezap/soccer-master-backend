import express from 'express'
import getAllGroups from '../../services/fixture/groups/getAllGroups.js'
import validateStageId from '../../middlewares/stages/validateStageId.js'
import capitalizeGroupName from '../../middlewares/groups/capitalizeGroupName.js'
import checkIfGroupAlreadyExist from '../../middlewares/groups/checkIfGroupAlreadyExist.js'
import createGroup from '../../services/fixture/groups/createGroup.js'
import runValidations from '../../middlewares/common/validations/runValidations.js'
import validateGroupName from '../../middlewares/groups/validateGroupName.js'
import validateTeamsIds from '../../middlewares/groups/validateTeamsIds.js'
import validateGroupId from '../../middlewares/groups/validateGroupId.js'
import checkIfGroupExist from '../../middlewares/groups/checkIfGroupExist.js'
import updateTeamsGroup from '../../services/fixture/groups/updateTeamsGroup.js'
import deleteGroup from '../../services/fixture/groups/deleteGroup.js'
import updateGroupName from '../../services/fixture/groups/updateGroupName.js'
import validateTeamId from '../../middlewares/teams/validateTeamId.js'
import deleteTeamGroupRecord from '../../services/fixture/groups/deleteTeamGroupRecord.js'
import validateTournamentExist from '../../middlewares/tournament-details/validateTournamentExist.js'
import getAllGroupsByTournament from '../../services/fixture/groups/getAllGroupsByTournament.js'

const groupsRouter = express.Router()

const runValidateGroupValues = runValidations([
    validateGroupName,
    validateStageId
])

const runValidateGroupValuesUpdate = runValidations([
    validateGroupId,
    validateStageId,
    validateTeamsIds
])

const runValidateGroupValuesUpdateName = runValidations([
    validateGroupId,
    validateGroupName
])

export const runValidateGroup = runValidations([
    validateGroupId,
    checkIfGroupExist
])

const runValidateTeamAndGroupIds = runValidations([
    validateGroupId,
    validateTeamId('teamId')
])

const runValidateIfGroupAlreadyExist = runValidations([
    checkIfGroupAlreadyExist
])

const runValidateIfGroupExist = runValidations([
    checkIfGroupExist
])

const runValidateTournament = runValidations([
    validateTournamentExist
])

groupsRouter.post('/create',
    runValidateGroupValues,
    capitalizeGroupName,
    runValidateIfGroupAlreadyExist,
    createGroup
)

groupsRouter.patch('/update',
    runValidateGroupValuesUpdate,
    runValidateIfGroupExist,
    updateTeamsGroup
)

groupsRouter.patch('/update-group-name',
    runValidateGroupValuesUpdateName,
    capitalizeGroupName,
    updateGroupName
)

groupsRouter.post('/delete',
    runValidateGroup,
    deleteGroup
)

// todo: si se elimina un equipo del grupo se deberia eliminar en cascada, los partidos relacionados no?
// todo: ya que si el equipo no existe mas en el grupo, no tendria sentido que existan partidos asociados al mismo
// todo: y a su vez, se deberia eliminar (restar, sumar, etc) los putos asociados a los partidos jugados?
// todo: tambien si se elimina un partido (matchesRouter), se deberian descontar los puntos asociados al mismo
groupsRouter.post('/delete-team-group',
    runValidateTeamAndGroupIds,
    deleteTeamGroupRecord
)

groupsRouter.post('/get-all-groups',
    getAllGroups
)

groupsRouter.post('/get-all-groups-by-tournament',
    runValidateTournament,
    getAllGroupsByTournament
)

export default groupsRouter
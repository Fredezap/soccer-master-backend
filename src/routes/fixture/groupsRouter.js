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

const runValidateGroupIdDelete = runValidations([
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
    runValidateGroupIdDelete,
    deleteGroup
)

groupsRouter.post('/delete-team-group',
    runValidateTeamAndGroupIds,
    deleteTeamGroupRecord
)

groupsRouter.post('/get-all-groups',
    getAllGroups
)

export default groupsRouter
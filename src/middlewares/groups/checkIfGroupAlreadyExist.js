import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import groupService from '../../services/fixture/groups/common/groupService.js'

const { GROUP_NAME_RELATED_TO_THAT_STAGE_ALREADY_EXISTS } = errorCodes.groupErrors

const checkIfGroupAlreadyExist = check('name')
    .custom(async(name, { req }) => {
        const { stageId } = req.body
        const existingGroup = await groupService.getOneByNameAndStageId(name, stageId)

        if (existingGroup) {
            throw new Error(GROUP_NAME_RELATED_TO_THAT_STAGE_ALREADY_EXISTS)
        }
    })

export default checkIfGroupAlreadyExist
import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'
import groupService from '../../services/fixture/groups/common/groupService.js'

const { SELECTED_GROUP_DO_NOT_EXIST } = errorCodes.groupErrors

const checkIfGroupExist = check('groupId')
    .custom(async(groupId, { req }) => {
        const group = await groupService.getOneById(groupId)

        if (!group) {
            throw new Error(SELECTED_GROUP_DO_NOT_EXIST)
        }
        req.body.group = group
    })

export default checkIfGroupExist
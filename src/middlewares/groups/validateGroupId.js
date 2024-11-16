import { check } from 'express-validator'
import errorCodes from '../../constants/errors/errorCodes.js'

const { INVALID_GROUP_ID } = errorCodes.groupErrors

const validateGroupId = check('groupId', INVALID_GROUP_ID)
    .exists()
    .isNumeric()

export default validateGroupId
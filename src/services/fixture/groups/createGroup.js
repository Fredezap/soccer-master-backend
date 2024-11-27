import { StatusCodes } from 'http-status-codes'
import errorCodes from '../../../constants/errors/errorCodes.js'
import groupService from './common/groupService.js'

const { ERROR_WHILE_CREATING_GROUP } = errorCodes.groupErrors
const createGroup = async(req, res) => {
    try {
        await groupService.create(req.body)
        return res.status(StatusCodes.CREATED).json()
    } catch (err) {
        const errors = [{ msg: ERROR_WHILE_CREATING_GROUP }]
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors })
    }
}

export default createGroup
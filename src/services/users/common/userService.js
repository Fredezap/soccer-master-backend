import { User } from '../../../models/userModel.js'
import { Op } from 'sequelize'

const registerUser = async(user) => {
    return await User.create(user)
}

const findByEmail = async(email) =>
    await User.findOne({ where: { email } }) // defaultScope aplica deleted:false

const findById = async(userId) =>
    await User.findOne({ where: { userId } }) // idem

const findAllByRole = async(role) =>
    await User.findAll({ where: { role } }) // idem

const deleteById = async(userId) => {
    const [updatedCount] = await User.update(
        { deleted: true },
        {
            where: { userId, deleted: false }
        }
    )
    return updatedCount
}

const destroyMany = async(userIds) => {
    return await User.update(
        { deleted: true },
        {
            where: {
                userId: {
                    [Op.in]: userIds
                },
                deleted: false
            }
        }
    )
}

const userService = {
    registerUser,
    findByEmail,
    findById,
    findAllByRole,
    deleteById,
    destroyMany
}

export default userService
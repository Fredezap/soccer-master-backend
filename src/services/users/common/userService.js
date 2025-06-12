import { User } from '../../../models/userModel.js'

const registerUser = async(user) => {
    await User.create(user)
}

const findByEmail = async(email) => await User.findOne({ where: { email } })

const findById = async(userId) => await User.findOne({ where: { userId } })

const userService = {
    registerUser,
    findByEmail,
    findById
}

export default userService
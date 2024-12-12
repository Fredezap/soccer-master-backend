import { User } from '../../../models/userModel.js'

const registerUser = async(user) => {
    await User.create(user)
}

const findByEmail = async(email) => await User.findOne({ where: { email } })

const checkUsersIsEmpty = async() => {
    const users = await User.findAll()
    if (users.length === 0) return true
    return false
}

const userService = {
    registerUser,
    findByEmail,
    checkUsersIsEmpty
}

export default userService
import { Stage } from '../../../../models/stageModel.js'

const create = async(data) => {
    const { name, type, order } = data

    try {
        const response = await Stage.create(
            {
                name,
                type,
                order
            }
        )

        return response
    } catch (error) {
        console.error('Error creating stage:', error)
        throw error
    }
}

const getOneByName = async(name) => {
    return await Stage.findOne({ where: { name } })
}

const getOneById = async(id) => {
    return Stage.findByPk(id)
}

const getOneByOrder = async(order) => {
    return await Stage.findOne({ where: { order } })
}

const getAll = async() => {
    return await Stage.findAll()
}

const update = async({ stageId, name }, { transaction = null }) => {
    return await Stage.update(
        { name },
        {
            where: { stageId },
            transaction
        }
    )
}

const destroy = async({ stageId }) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const result = await Stage.destroy({
            where: { stageId }
        })

        if (result === 0) {
            throw new Error(`Stage with ID ${stageId} not found`)
        }

        return result
    } catch (error) {
        throw error
    }
}

const stageService = {
    create,
    getOneByName,
    getOneByOrder,
    getAll,
    getOneById,
    destroy
}

export default stageService
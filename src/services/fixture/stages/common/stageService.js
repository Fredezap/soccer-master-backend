import { Group } from '../../../../models/groupModel.js'
import { Match } from '../../../../models/matchModel.js'
import { Stage } from '../../../../models/stageModel.js'
import { Team } from '../../../../models/teamModel.js'

const create = async(data) => {
    const { name, type, order } = data

    // eslint-disable-next-line no-useless-catch
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
    const stages = await Stage.findAll({
        include: {
            model: Match,
            include: [
                {
                    model: Team,
                    as: 'LocalTeam',
                    include: [
                        {
                            model: Group,
                            through: { attributes: [] } // Excluye los datos de TeamGroup
                        }
                    ]
                },
                {
                    model: Team,
                    as: 'VisitorTeam',
                    include: [
                        {
                            model: Group,
                            through: { attributes: [] } // Excluye los datos de TeamGroup
                        }
                    ]
                }
            ]
        },
        order: [[{ model: Match }, 'date', 'ASC']]
    })

    return stages
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
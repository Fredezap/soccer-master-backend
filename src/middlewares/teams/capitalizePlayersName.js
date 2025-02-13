import capitalizeName from '../common/validations/capitalizeName.js'

const capitalizePlayerName = (req, res, next) => {
    const playersToArray = JSON.parse(req.body.players)

    if (Array.isArray(playersToArray).length === 0) {
        return next()
    }

    const playersCapitalized = playersToArray.map(player => {
        return {
            ...player,
            name: player.name
                .split(' ')
                .map(word => capitalizeName(word))
                .join(' ')
        }
    })

    req.body.players = playersCapitalized
    next()
}

export default capitalizePlayerName
import capitalizeName from '../common/validations/capitalizeName.js'

const capitalizePlayerName = (req, res, next) => {
    const players = req.body.players || []

    if (players.length === 0) {
        return next()
    }

    const playersCapitalized = players.map(player => {
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
import capitalizeName from '../common/validations/capitalizeName.js'

const capitalizeStageName = (req, res, next) => {
    req.body.name = capitalizeName(req.body.name)
    next()
}

export default capitalizeStageName
import capitalizeName from '../common/validations/capitalizeName.js'

const capitalizeGroupName = (req, res, next) => {
    req.body.name = capitalizeName(req.body.name)
    next()
}

export default capitalizeGroupName
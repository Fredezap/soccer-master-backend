import requestIp from 'request-ip'

const GetUserIp = (req, res, next) => {
    const ip = requestIp.getClientIp(req)
    req.body.userIp = ip
    next()
}

export default GetUserIp
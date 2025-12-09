import requestIp from 'request-ip'

const GetUserIp = (req, res, next) => {
    const ip = requestIp.getClientIp(req) // devuelve la IP real
    console.log('IP detectada:', ip)
    req.body.userIp = ip
    next()
}

export default GetUserIp
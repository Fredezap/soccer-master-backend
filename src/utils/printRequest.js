const printRequest = (req, res, next) => {
    console.log('Headers request: ', req.headers)
    console.log('Body request: ', req.body)
    console.log('Files request: ', req.files)
    next()
}

export default printRequest
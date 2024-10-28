function capitalizeFullname(req, res, next) {
    const capitalizeWord = (word) => {
        const wordCapitalized = word.replace(/\b\w/g, function(char) {
            return char.toUpperCase()
        })
        return wordCapitalized
    }

    req.body.name = capitalizeWord(req.body.name)
    req.body.surname = capitalizeWord(req.body.surname)
    next()
}

export default capitalizeFullname
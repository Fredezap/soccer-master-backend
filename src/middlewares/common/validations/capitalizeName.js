const capitalizeName = (word) => {
    const wordCapitalized = word.replace(/\b\w/g, function(char) {
        return char.toUpperCase()
    })
    return wordCapitalized
}

export default capitalizeName
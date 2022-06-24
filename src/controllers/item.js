const getTestItems = (req, res, next) => {
    res.status = 200
    res.json({'From test item': 'OK'})
    next()
}

module.exports = {
    getTestItems
}
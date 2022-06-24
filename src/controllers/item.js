const Item = require('../models/item');

const getTestItems = (req, res, next) => {
    res.status = 200
    res.json({'From test item': 'OK'})
    next()
}

const getItems = (req, res) => {
    const items = Item.find()
    res.status(200)
        .json({'your food': items})
}

const addItem = (req, res) => {
    const { name } = req.body
    
    try {
        const item = Item.create(name)
        res.status(201)
        .json({'New': item})
    } catch (error) {
        res.status(404)
        .json({'Nothing found': error})
    }
}

module.exports = {
    getTestItems,
    getItems,
    addItem
}
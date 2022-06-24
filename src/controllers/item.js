const Item = require('../models/item');


const getItems = (req, res) => {
    const items = Item.find()

    try {
        res.status(200)
        .json({'All items': items})
    } catch (err) {
        res.status(404)
        .json({'error': err})
    }
}

const addItem = (req, res) => {
    const { name } = req.body
    
    try {
        const item = Item.create(name)
        res.status(201)
        .json({'New': item})
    } catch (err) {
        res.status(404)
        .json({'Nothing found': err})
    }
}

const getItem = (req, res) => {
    const item = Item.findById()
    
    try {
        res.status(200)
        .json({'name': item})
    } catch (err) {
        res.status(404)
        .json({'error': err})
    }
}

module.exports = {
    getItems,
    addItem,
    getItem
}
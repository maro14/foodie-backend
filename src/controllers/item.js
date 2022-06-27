const Item = require('../models/item');


const getItems = async(req, res) => {
    const items = await Item.find()

    try {
        res.status(200)
        .json({'All items': items})
    } catch (err) {
        res.status(404)
        .json({'error': err})
    }
}

const addItem = async(req, res) => {
    const { name } = req.body
    
    try {
        const item = await Item.create(name)
        res.status(201)
        .json({'New': item})
    } catch (err) {
        res.status(404)
        .json({'Nothing found': err})
    }
}

const getItem = async(req, res) => {
    const item = await Item.findById()
    
    try {
        res.status(200)
        .json({'name': item})
    } catch (err) {
        res.status(404)
        .json({'error': err})
    }
}

const updateItem = async(req, res) => {
    const { name } = req.body

    try {
        const item = await Item.findOneAndUpdate(name)
        res.status(200)
        .json({'update': item})
    } catch (err) {
        res.status(404)
        .json({'error': err})
    }
}

const deleteItem = (req, res) => {
    const { name } = req.body

    try {
        const item = await Item.findOneAndDelete(name)
        res.status(200)
        .json({'delete': item})
    } catch (err) {
        res.status(404)
        .json({'error':err})
    }
}

module.exports = {
    getItems,
    addItem,
    getItem,
    updateItem,
    deleteItem
}
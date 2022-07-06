const Item = require('../models/item')


const getItems = async(req, res) => {
    
    try {
        const items = await Item.find()
        res.status(200)
        .json({ data : items })
    } catch (err) {
        res.status(500)
        .json({ message : err.message })
    }
}

const addItem = async(req, res) => {
    
    try {
        const { name } = req.body
        const item = await Item.create(name)
        res.status(201)
        .json({ data : item })
    } catch (err) {
        res.status(500)
        .json({ message : err.massage })
    }
}

const getItem = async(req, res) => {
    
    try {
        const item = await Item.findById()
        res.status(200)
        .json({ data : item })
    } catch (err) {
        res.status(500)
        .json({ message : err.massage })
    }
}

const updateItem = async(req, res) => {
    
    try {
        const { name } = req.body
        const item = await Item.findOneAndUpdate(name)
        res.status(200)
        .json({ data : item })
    } catch (err) {
        res.status(404)
        .json({ message : err.message })
    }
}

const deleteItem = async(req, res) => {
    
    try {
        const { name } = req.body
        const item = await Item.findOneAndDelete(name)
        res.status(200)
        .json({ data : item })
    } catch (err) {
        res.status(404)
        .json({ message : err.massage })
    }
}

module.exports = {
    getItems,
    addItem,
    getItem,
    updateItem,
    deleteItem
}
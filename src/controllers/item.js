const Item = require('../models/item')


const getItems = async(req, res) => {
    const items = await Item.find()

    try {
        res.status(200)
        .json({ data : items })
    } catch (err) {
        res.status(500)
        .json({ message : err.message })
    }
}

const addItem = async(req, res) => {
    const { name } = req.body
    
    try {
        const item = await Item.create(name)
        res.status(201)
        .json({ data : item })
    } catch (err) {
        res.status(500)
        .json({ message : err.massage })
    }
}

const getItem = async(req, res) => {
    const item = await Item.findById()
    
    try {
        res.status(200)
        .json({ data : item })
    } catch (err) {
        res.status(500)
        .json({ message : err.massage })
    }
}

const updateItem = async(req, res) => {
    const { name } = req.body

    try {
        const item = await Item.findOneAndUpdate(name)
        res.status(200)
        .json({ data : item })
    } catch (err) {
        res.status(404)
        .json({ message : err.message })
    }
}

const deleteItem = (req, res) => {
    const { name } = req.body

    try {
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
const Item = require('../models/item')


const getItems = async(req, res) => {

    try {
        const items = await Item.find()
        res.status(200)
            .json({ data: items })
    } catch (err) {
        res.status(500)
            .json({ message: err.message })
    }
}

const addItem = async(req, res) => {

    try {
        const { name, price, description, review } = req.body
        const item = await Item.create({ name, price, description, review: review || [] })
        res.status(201)
            .json({ data: item })
    } catch (err) {
        res.status(500)
            .json({ message: err.massage })
    }
}

const getItem = async(req, res) => {

    try {
        const id = req.params
        const item = await Item.findById({ id })
        res.status(200)
            .json({ data: item })
    } catch (err) {
        res.status(500)
            .json({ message: err.massage })
    }
}

const updateItem = async(req, res) => {

    try {
        const { id, name } = req.body
        const item = await Item.findOneAndUpdate(id, { name }, { new: true })
        res.status(200)
            .json({ data: item })
    } catch (err) {
        res.status(404)
            .json({ message: err.message })
    }
}

const deleteItem = async(req, res) => {

    try {
        const { id } = req.params
        const item = await Item.findOneAndDelete(id)
        res.status(200)
            .json({ data: item })
    } catch (err) {
        res.status(404)
            .json({ message: err.massage })
    }
}

module.exports = {
    getItems,
    addItem,
    getItem,
    updateItem,
    deleteItem
}

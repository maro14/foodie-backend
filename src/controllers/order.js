const Order = require('../models/order');

const getOrders = async(req, res) => {
    try {
        const order = await Order.find({})
        res.status(200).json({
            data: order
        })
    } catch (err) {
        res.status(400).json({
            data: err.message
        })
    }
}

const createOrder = async(req, res) => {
    try {
        const { user, item } = req.body
        const order = await Order.create({ user, item })
        res.status(201).json({ 
            data: order
        })
    } catch (error) {
        res.status(400).json({
            data: err.message
        })
    }
}

module.exports = { getOrders, 
                createOrder }
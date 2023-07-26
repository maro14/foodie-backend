const Order = require('../models/order');
const User = require('../models/user');
const Item = require('../models/item');

const getOrders = async(req, res) => {
    try {
        const order = await Order.find({})
        res.status(200).json({ data: order })
    } catch (err) {
        res.status(400)
            .json({data: err.message})
    }
}

const createOrder = async(req, res) => {
    try {
        const { userId, itemIds } = req.body

        const user = await User.findById(userId)
        if (!user) {
          res.status(404).json({ message: 'User not found'})
        }

        const items = await Item.find({ _id: { $in: itemIds }})
        if (items.length !== itemIds.length) {
          res.status(400).json({ message: 'One or more items not found'})
        }
        const order = await Order.create({ user: userId, items: itemIds })
        res.status(201)
            .json({ data: order })
    } catch (error) {
        res.status(400)
            .json({ data: err.message })
    }
}

module.exports = {
    getOrders,
    createOrder
}

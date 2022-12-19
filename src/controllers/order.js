const Order = require('../models/order');

const getOrders = async(req, res) => {
    try {
        const order = await Order.find({})
        res.status(200).json({
            data: order
        })
    } catch (err) {
        res.status(400).json({
            data: err
        })
    }
}

module.exports = getOrders
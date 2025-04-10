//src/controllers/order.js
const Order = require('../models/order');
const User = require('../models/user');
const Item = require('../models/item');
const { AppError } = require('../middlewares/error');

const getOrders = async(req, res, next) => {
    try {
        const orders = await Order.find({})
            .populate('user')
            .populate('items');
        res.status(200).json({
            status: 'success',
            data: orders
        });
    } catch (err) {
        next(new AppError('Failed to fetch orders', 500));
    }
};

const createOrder = async(req, res, next) => {
    try {
        const { userId, itemIds } = req.body;

        if (!userId || !itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
            return next(new AppError('Invalid request data', 400));
        }

        const user = await User.findById(userId);
        if (!user) {
            return next(new AppError('User not found', 404));
        }

        const items = await Item.find({ _id: { $in: itemIds }});
        if (items.length !== itemIds.length) {
            return next(new AppError('One or more items not found', 400));
        }

        const order = await Order.create({ user: userId, items: itemIds });
        res.status(201).json({
            status: 'success',
            data: order
        });
    } catch (err) {
        next(new AppError('Failed to create order', 500));
    }
};

module.exports = {
    getOrders,
    createOrder
};

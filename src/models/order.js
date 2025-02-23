//src/models/order.js
const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'item',
        required: true
    }],
    quantity: {
        type: Number,
        default: 1
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Order = model('order', orderSchema)

module.exports = Order

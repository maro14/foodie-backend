const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'item'
    }
})

const Order = model('order', orderSchema)

module.exports = Order
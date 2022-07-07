const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    name: String
})

const Order = model('order', orderSchema)

module.exports = Order
const { Schema , model } = require('mongoose')
const Review = require('./review').reviewSchema

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    review: [Review]
}, {timestamps: true })

const Item = model('Item', itemSchema)

module.exports = Item

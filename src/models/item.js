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
    review: {
      type: [String],
      default: []
    },

    createdAt: {
      type: Date,
      default: Date.now()
  }
})

const Item = model('Item', itemSchema)

module.exports = Item

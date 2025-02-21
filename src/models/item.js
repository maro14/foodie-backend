const { Schema , model } = require('mongoose')

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
    category: {
        type: String,
        enum: ['appetizer', 'main', 'dessert', 'beverage'],
    },
    reviews: {
      type: [Schema.Types.ObjectId],
      ref: 'review'
    },
    createdAt: {
      type: Date,
      default: Date.now()
  }
})

const Item = model('Item', itemSchema)

module.exports = Item

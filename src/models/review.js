const { Schema, model } = require('mongoose')

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: 'item',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      maxlength: 255
    }
})

const Review = model('review', reviewSchema)

module.exports = Review

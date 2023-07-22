const { Schema, model } = require('mongoose')

const reviewSchema = new Schema({
    name: {
        type: String
    }
})

const Review = model('review', reviewSchema)

module.exports = Review
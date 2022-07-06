const { Schema, model } = require('mongoose')

const reviewSchema = new Schema({
    name: {
        type: String
    }
})

module.exports = Review = model('review', reviewSchema)
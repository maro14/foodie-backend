const { Schema, model } = require('mongoose')

const reviewSchema = Schema({
    name: {
        type: String
    }
})

module.exports = Review = model('review', reviewSchema)
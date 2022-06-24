const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    _id : {
        type: String,
        require: true },
    name: {
        type: String,
        require: true
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    }
    
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
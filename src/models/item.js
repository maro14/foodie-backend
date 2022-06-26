const { Schema , model } = require('mongoose')


const itemSchema = new Schema({
    name: {
        type: String,
        require: true
    }
})

module.exports = Item = model('item', itemSchema)
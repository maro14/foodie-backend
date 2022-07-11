const { Schema , model } = require('mongoose')


const itemSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    timestamps: true 
})

module.exports = Item = model('item', itemSchema)
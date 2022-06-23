const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    name: mongoose.SchemaTypes.String
})

const Item = mongoose.model('Item', itemSchema)

export default {
    Item
}
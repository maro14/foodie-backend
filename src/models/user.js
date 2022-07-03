const { Schema , model } = require('mongoose')

const userSchema = new Schema({
    name : {
        type: String
    },
    email : {
        type: String
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = User = model('user', userSchema)
const { Schema , model } = require('mongoose')

const userSchema = new Schema({
    name : {
        type: String
    },
    username: {
        type: String
    },
    email : {
        type: String
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = User = model('user', userSchema)
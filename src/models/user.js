const { Schema , model } = require('mongoose')

const userSchema = new Schema({
    name : {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, "Passoword must contain at least 6 characters"]
    }
})

module.exports = User = model('user', userSchema)
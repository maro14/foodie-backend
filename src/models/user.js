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
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Passoword must contain at least 6 characters"],
        maxLength: 6
    }
})

module.exports = User = model('user', userSchema)
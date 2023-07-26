const { Schema , model } = require('mongoose')

const userSchema = new Schema({
    name : {
        type: String,
        require: true
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
        required: [true, "Pasoword must contain at least 6 characters"],
        minLength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

const User = model('user', userSchema)

module.exports = User

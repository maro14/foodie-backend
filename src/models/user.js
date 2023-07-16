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
    }
})

module.exports = User = model('user', userSchema)
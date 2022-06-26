const { Schema , model } = require('mongoose')

const userSchema = new Schema({
    fullName : {
        type: String
    },
    email : {
        type: String
    }
})

module.exports = User = model('user', userSchema)
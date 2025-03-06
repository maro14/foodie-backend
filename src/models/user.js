//src/models/user.js
const { Schema , model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxlength: 8
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password must contain at least 6 characters'],
        minLength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

const User = model('user', userSchema);

module.exports = User;

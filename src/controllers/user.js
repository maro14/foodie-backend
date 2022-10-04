const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signIn = async(req, res) => {

    try {
        const { username, email, password } = req.body

        user = User.findOne({ email })
        if (user) {
            res.status(404).json({
                message: 'User already exists '
            })
        }

    } catch (err) {
        res.status(500).json({
            data: err,
            message: 'Server error'
        })
    }
    
}
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signIn = async(req, res) => {

    try {
        const { username, email, password } = req.body

        emailUser = await User.findOne({ email })
        if (emailUser) {
            res.status(404).json({
                message: 'User already exists'
            })
        }
        encryptedPassword = bcrypt.hash(password, 10)

        const addUser = await User.create({
            username,
            email,
            password: encryptedPassword
        })

        const token = jwt.sign({
            user_id: user_id, email
        }, process.env.TOKEN_ID, 
        {
            expiresIn: "2h",
        })

        addUser.token = token

        res.status(201).json({
            data: token
        })

    } catch (err) {
        res.status(500).json({
            data: err,
            message: 'Server error'
        })
    }
    
}

module.exports = signIn
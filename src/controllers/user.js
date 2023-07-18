const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signIn = async(req, res) => {

    try {
        const { username, email, password } = req.body

        emailUser = await User.findOne({ email })
        if (emailUser) {
            res.status(404)
                .json({ message: 'User already exists' })
        }
        encryptedPassword = bcrypt.hash(password, 10)

        const addUser = await User.create({
            username,
            email,
            password: encryptedPassword
        })

        const token = jwt.sign({
            user_id: user_id, email
        }, 'secret', 
        {
            expiresIn: "2h",
        })

        addUser.token = token

        res.status(201)
            .json({ data: token })

    } catch (err) {
        res.status(500)
            .json({ data: err, message: 'Server error' })
    }
    
}

const logIn = async(req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            res.status(404)
                .json({ message: 'Invalid credentials' })
        }

        const passwordIsMatch = await bcrypt.compare(password, user.password)
        if (!passwordIsMatch) {
            res.status(404)
                .json({ message: 'Invalid credentials' })
        }
        const token = jwt.sign({
                userId: user._id }, 'secret', 
                { expiresIn: '1h' })

        res.json({ token })

    } catch (err) {
        res.status(500).json({ message: err.message})
    }
}

module.exports = { signIn, logIn }
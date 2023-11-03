const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signIn = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    const emailUser = await User.findOne({ email })
    if (emailUser) {
      return res.status(404).json({ message: 'User already exists' })
    }

    if (role && !['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' })
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username,
      email,
      password: encryptedPassword,
      role: role || 'user'
    })

    const token = jwt.sign({
      user_id: newUser._id,
      email: newUser.email
    }, 'secret')

    res.status(201).json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
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

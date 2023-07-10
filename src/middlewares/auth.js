const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateUser = async(req, res, next) => {
    try {
        
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            res.status(401)
                .json({ message: 'Unauthorized'})
        }

        const decoded = jwt.verify(token, 'secret')

        const user = await User.findById(decoded.user)
        if (!user) {
            res.status(401)
                .json({ message: 'Unauthorized'})
        }

        req.user = user
        next()

    } catch (err) {
        res.status(500)
            .json({ message: 'Invalid token'})
    }
}

module.exports = authenticateUser
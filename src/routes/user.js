//src/routes/user.js
const express = require('express');
const { register,
    logIn } = require('../controllers/user');

const router = express.Router()

router.post('/register', register)
router.post('/login', logIn)

module.exports = router

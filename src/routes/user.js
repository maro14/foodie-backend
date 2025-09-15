//src/routes/user.js
const express = require('express');
const { register, logIn } = require('../controllers/user');
const { authLimiter } = require('../middlewares/rateLimit'); // Import authLimiter

const router = express.Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, logIn);

module.exports = router;

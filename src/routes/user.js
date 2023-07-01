const { signIn } = require('../controllers/user');
const express = require('express');

const router = express.Router()

router.post('/', signIn)

module.exports = router
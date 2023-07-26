const express = require('express');
const { getOrders,
        createOrder} = require('../controllers/order');

const { authenticateUser } = require('../authentication/auth');
const router = express.Router()

router.get('/', authenticateUser, getOrders)
router.post('/', authenticateUser, createOrder)

module.exports = router

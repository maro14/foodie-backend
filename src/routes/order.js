const express = require('express');
const { authenticateUser } = require('../middlewares/auth');
const { getOrders, createOrder } = require('../controllers/order');

const router = express.Router();

router.get('/', authenticateUser, getOrders);
router.post('/', authenticateUser, createOrder);

module.exports = router;

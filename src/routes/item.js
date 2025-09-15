//src/routes/item.js
const express = require('express');
const { authenticateUser, isAdmin } = require('../middlewares/auth');
const { getItems, getItem, addItem, updateItem, deleteItem } = require('../controllers/item');
const { createItemValidator, updateItemValidator } = require('../validators/itemValidator');
const validate = require('../middlewares/validate');
const { apiLimiter } = require('../middlewares/rateLimit'); // Import apiLimiter

const router = express.Router();

router.get('/', apiLimiter, getItems);
router.get('/:id', apiLimiter, getItem);
router.post('/', apiLimiter, authenticateUser, isAdmin, createItemValidator, validate, addItem);
router.put('/:id', apiLimiter, authenticateUser, isAdmin, updateItemValidator, validate, updateItem);
router.delete('/:id', apiLimiter, authenticateUser, isAdmin, deleteItem);

module.exports = router;

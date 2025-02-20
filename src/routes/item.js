const express = require('express');
const { authenticateUser, isAdmin } = require('../middlewares/auth');
const { getItems, getItem, addItem, updateItem, deleteItem } = require('../controllers/item');

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItem);
router.post('/', authenticateUser, isAdmin, addItem);
router.put('/:id', authenticateUser, isAdmin, updateItem);
router.delete('/:id', authenticateUser, isAdmin, deleteItem);

module.exports = router;

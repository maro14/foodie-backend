const express = require('express')
const {
    getItems,
    addItem,
    getItem,
    updateItem,
    deleteItem

} = require('../controllers/item');

const { 
    authenticateUser, 
    isAdmin 

} = require('../authentication/auth');

const router = express.Router()

router.get('/', getItems)
router.get('/:id`', getItem)

router.post('/', authenticateUser, isAdmin, addItem)
router.put('/:id', authenticateUser , isAdmin, updateItem)
router.delete('/:id', authenticateUser, isAdmin, deleteItem)

module.exports = router
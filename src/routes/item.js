const express = require('express')
const {
    getItems,
    addItem,
    getItem,
    updateItem,
    deleteItem

} = require('../controllers/item');

const router = express.Router()

router.get('/items', getItems)
router.get('/:id`', getItem)
router.post('/', addItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

module.exports = router
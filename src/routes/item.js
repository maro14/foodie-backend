const express = require('express')
const {
    getItems,
    addItem,
    getItem
} = require('../controllers/item');

const router = express.Router()

router.get('/items', getItems)
router.get('/item/:id`', getItem)
router.post('/item', addItem)

module.exports = router
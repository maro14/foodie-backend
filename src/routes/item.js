const express = require('express')
const {
    getTestItems,
    getItems,
    addItem
} = require('../controllers/item');

const router = express.Router()

router.get('/test', getTestItems)
router.get('/items', getItems)
router.post('/item', addItem)

module.exports = router
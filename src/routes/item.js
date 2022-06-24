const express = require('express')
const {
    getTestItems
} = require('../controllers/item');

const router = express.Router()

router.get('/test', getTestItems)

module.exports = router
const express = require('express')
const {
    getTestItem
} = require('../controllers/item');

const router = express.Router()

router.get('/item', getTestItem)
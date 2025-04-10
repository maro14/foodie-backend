//src/controllers/item.js
const Item = require('../models/item');

/**
 * Retrieves all items from the database
 * @async
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @returns {Promise<void>} - JSON response with array of items
 */
const getItems = async(req, res) => {

    try {
        const items = await Item.find();
        res.status(200)
            .json({ data: items });
    } catch (err) {
        res.status(500)
            .json({ message: err.message });
    }
};

/**
 * Creates a new item in the database
 * @async
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {Object} req.body - Request body
 * @param {string} req.body.name - Name of the item
 * @param {number} req.body.price - Price of the item
 * @param {string} req.body.description - Description of the item
 * @param {Array} [req.body.review] - Optional array of reviews
 * @returns {Promise<void>} - JSON response with created item
 */
const addItem = async(req, res) => {

    try {
        const { name, price, description, review } = req.body;
        const item = await Item.create({ name, price, description, review: review || [] });
        res.status(201)
            .json({ data: item });
    } catch (err) {
        res.status(500)
            .json({ message: err.message });
    }
};

/**
 * Retrieves a specific item by ID
 * @async
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - Item ID to retrieve
 * @returns {Promise<void>} - JSON response with item data
 */
const getItem = async(req, res) => {

    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        res.status(200)
            .json({ data: item });
    } catch (err) {
        res.status(500)
            .json({ message: err.message });
    }
};

/**
 * Updates an existing item by ID
 * @async
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - Item ID to update
 * @param {Object} req.body - Request body
 * @param {string} req.body.name - New name for the item
 * @returns {Promise<void>} - JSON response with updated item
 */
const updateItem = async(req, res) => {

    try {
        const { id } = req.params;
        const { name } = req.body;
        const item = await Item.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200)
            .json({ data: item });
    } catch (err) {
        res.status(404)
            .json({ message: err.message });
    }
};

/**
 * Deletes an item by ID
 * @async
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - Item ID to delete
 * @returns {Promise<void>} - JSON response with deleted item
 */
const deleteItem = async(req, res) => {

    try {
        const { id } = req.params;
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404)
                      .json({ message: 'Item not found' });
        }
        await Item.findByIdAndDelete(id);
        res.status(200)
            .json({ data: item });
    } catch (err) {
        res.status(404)
            .json({ message: err.message });
    }
};

module.exports = {
    getItems,
    addItem,
    getItem,
    updateItem,
    deleteItem
};

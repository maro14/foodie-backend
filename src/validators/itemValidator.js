const { check } = require('express-validator');

exports.createItemValidator = [
    check('name')
        .trim()
        .notEmpty()
        .withMessage('Item name is required')
        .isLength({ max: 100 })
        .withMessage('Item name cannot exceed 100 characters'),

    check('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number'),

    check('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),

    check('category')
        .notEmpty()
        .withMessage('Category is required')
        .isIn(['Electronics', 'Books', 'Home', 'Clothing', 'Food'])
        .withMessage('Invalid category. Must be one of: Electronics, Books, Home, Clothing, Food')
];

exports.updateItemValidator = [
    check('name')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Item name cannot exceed 100 characters'),

    check('price')
        .optional()
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number'),

    check('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Description cannot exceed 500 characters'),

    check('category')
        .optional()
        .isIn(['Electronics', 'Books', 'Home', 'Clothing', 'Food'])
        .withMessage('Invalid category. Must be one of: Electronics, Books, Home, Clothing, Food')
];

const { check } = require('express-validator');

exports.registerValidator = [
    check('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ max: 8 })
        .withMessage('Username cannot exceed 8 characters'),

    check('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email address'),

    check('password')
        .trim()
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    check('role')
        .optional()
        .isIn(['user', 'admin'])
        .withMessage('Invalid role')
];

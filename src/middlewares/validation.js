const { validationResult, body } = require('express-validator');

const validateUser = [
    body('username').trim().isLength({ min: 3, max: 8 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

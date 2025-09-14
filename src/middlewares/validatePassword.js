const { AppError } = require('./error');

const validatePassword = (password) => {
    // At least 6 characters
    if (password.length < 6) return false;

    // At least one uppercase letter
    if (!/[A-Z]/.test(password)) return false;

    // At least one number
    if (!/\d/.test(password)) return false;

    // At least one special character
    if (!/[!@#$%^&*]/.test(password)) return false;

    return true;
};

module.exports = (req, res, next) => {
    const { password } = req.body;

    if (!validatePassword(password)) {
        return next(new AppError(
            'Password must be at least 6 characters long and contain at least one uppercase letter, one number, and one special character',
            400
        ));
    }
    next();
};

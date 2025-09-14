//src/controllers/user.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { AppError } = require('../middlewares/error');

/**
 * Registers a new user
 * @async
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 */
const register = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;

        // Validate input with more specific messages
        if (!username) {
            return next(new AppError('Username is required', 400));
        }
        if (!email) {
            return next(new AppError('Email is required', 400));
        }
        if (!password) {
            return next(new AppError('Password is required', 400));
        }

        // Username validation
        if (username.length > 8) {
            return next(new AppError('Username cannot exceed 8 characters', 400));
        }

        // Check password strength
        if (password.length < 6) {
            return next(new AppError('Password must be at least 6 characters', 400));
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return next(new AppError('Please provide a valid email address', 400));
        }

        // Check if user exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return next(new AppError('User with this email or username already exists', 400));
        }
 
        // Validate role
        if (role && !['user', 'admin'].includes(role)) {
            return next(new AppError('Invalid role', 400));
        }

        // Hash password
        const encryptedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: role || 'user'
        });

        // Generate token
        const token = generateToken(newUser);

        res.status(201).json({
            status: 'success',
            message: 'Registration successful',
            token,
            data: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (err) {
        next(new AppError('Server error during registration', 500));
    }
};

/**
 * Logs in an existing user
 * @async
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 */
const logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return next(new AppError('All fields are required', 400));
        }

        // Find user
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) {
            return next(new AppError('Invalid credentials', 401));
        }

        // Verify password
        const passwordIsMatch = await bcrypt.compare(password, user.password);
        if (!passwordIsMatch) {
            return next(new AppError('Invalid credentials', 401));
        }

        // Generate token
        const token = generateToken(user);

        // Remove password from output
        user.password = undefined;

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        next(new AppError('Server error during login', 500));
    }
};

/**
 * Generates a JWT token for a user
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
const generateToken = (user) => {
    return jwt.sign(
        {
            user_id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
};

module.exports = { register, logIn };

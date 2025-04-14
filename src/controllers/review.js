//src/controllers/review.js
const Review = require('../models/review');
const Item = require('../models/item');
const { AppError } = require('../middlewares/error');

/**
 * Creates a new review for an item
 * @async
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 * @returns {Promise<void>} - JSON response with created review
 */
const CreateReview = async(req, res, next) => {
    try {
        const { itemid } = req.params;
        const { rating, comment } = req.body;

        // Validate input
        if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
            return next(new AppError('Rating must be a number between 1 and 5', 400));
        }

        // Check if item exists
        const item = await Item.findById(itemid);
        if (!item) {
            return next(new AppError('Item not found', 404));
        }

        // Create review
        const review = await Review.create({
            user: req.user._id,
            item: itemid,
            rating,
            comment: comment || ''
        });

        // Return success response
        res.status(201).json({
            status: 'success',
            data: review
        });
    } catch (err) {
        next(new AppError('Failed to create review', 500));
    }
};

module.exports = { CreateReview };

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
const createReview = async(req, res, next) => {
    try {
        const { itemId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user._id;

        // Validate input
        if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
            return next(new AppError('Rating must be a number between 1 and 5', 400));
        }

        // Check if item exists
        const item = await Item.findById(itemId);
        if (!item) {
            return next(new AppError('Item not found', 404));
        }

        // Check if user already reviewed this item
        const existingReview = await Review.findOne({ user: userId, item: itemId });
        if (existingReview) {
            return next(new AppError('You have already reviewed this item', 400));
        }

        // Create review
        const review = await Review.create({
            user: userId,
            item: itemId,
            rating,
            comment: comment || ''
        });

        // Add review to item
        await Item.findByIdAndUpdate(itemId, {
            $push: { reviews: review._id }
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

/**
 * Gets all reviews for an item
 * @async
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 * @returns {Promise<void>} - JSON response with reviews
 */
const getItemReviews = async(req, res, next) => {
    try {
        const { itemId } = req.params;

        // Check if item exists
        const item = await Item.findById(itemId);
        if (!item) {
            return next(new AppError('Item not found', 404));
        }

        // Get reviews with user details
        const reviews = await Review.find({ item: itemId })
            .populate('user', 'username')
            .sort('-createdAt');

        res.status(200).json({
            status: 'success',
            results: reviews.length,
            data: reviews
        });
    } catch (err) {
        next(new AppError('Failed to fetch reviews', 500));
    }
};

/**
 * Updates a review
 * @async
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 * @returns {Promise<void>} - JSON response with updated review
 */
const updateReview = async(req, res, next) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user._id;

        // Validate rating
        if (rating && (isNaN(rating) || rating < 1 || rating > 5)) {
            return next(new AppError('Rating must be a number between 1 and 5', 400));
        }

        // Find and update review
        const review = await Review.findOneAndUpdate(
            { _id: reviewId, user: userId },
            { rating, comment },
            { new: true, runValidators: true }
        );

        if (!review) {
            return next(new AppError('Review not found or unauthorized', 404));
        }

        res.status(200).json({
            status: 'success',
            data: review
        });
    } catch (err) {
        next(new AppError('Failed to update review', 500));
    }
};

module.exports = {
    createReview,
    getItemReviews,
    updateReview
};

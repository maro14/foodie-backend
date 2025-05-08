const express = require('express');
const { authenticateUser } = require('../middlewares/auth');
const { createReview, getItemReviews, updateReview } = require('../controllers/review');

const router = express.Router({ mergeParams: true });

router.post('/', authenticateUser, createReview);
router.get('/', getItemReviews);
router.patch('/:reviewId', authenticateUser, updateReview);

module.exports = router;

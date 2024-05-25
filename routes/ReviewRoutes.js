const express = require('express');
const router = express.Router();
const {createReview,getReviewsForBook,updateReview,deleteReview} = require('../controllers/ReviewController');
const { isAuthenticated, isAdmin } = require('../middleware/Authorization');

// Create a review (authenticated users)
router.post('/reviews/:userId/:bookId', createReview); // isAuthenticated

// Get all reviews for a book
router.get('/books/:bookId', getReviewsForBook);

// Update a review (admin only)
router.put('/reviews/:reviewId', isAuthenticated, isAdmin, updateReview);

// Delete a review (admin only)
router.delete('/reviews/:reviewId', isAuthenticated, isAdmin, deleteReview);

module.exports = router;

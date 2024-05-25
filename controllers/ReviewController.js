const Review = require('../model/ReviewModel');
const Book = require('../model/BooksModel');
const User = require('../model/UserModel');

// Create a review
const createReview = async (req, res) => {
    try {
        const { userId, bookId } = req.params;
        const { rating, review } = req.body;

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).send({ message: 'User not found' });
        };
        // Validate if book exists
        const bookExists = await Book.findById(bookId);
        if (!bookExists) {
            return res.status(404).send({ message: 'Book not found' });
        }

        const newReview = new Review({
            rating,
            review
        });

        await newReview.save();
        res.status(201).send({ message: 'Review created successfully' });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).send({ message: 'Error creating review' });
    }
}

// Get all reviews for a book
const getReviewsForBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const reviews = await Review.find({ book: bookId }).populate('user', 'name');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a review
const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, review } = req.body;

        const existingReview = await Review.findById(reviewId);
        if (!existingReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        existingReview.rating = rating;
        existingReview.review = review;
        await existingReview.save();

        res.status(200).json({ message: 'Review updated successfully', review: existingReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        const existingReview = await Review.findByIdAndDelete(reviewId);
        if (!existingReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createReview, getReviewsForBook, updateReview, deleteReview };

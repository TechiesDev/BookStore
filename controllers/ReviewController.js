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
            return res.status(404).send({ message: res.__('review.usr_nt_fnd') });
        };
        // Validate if book exists
        const bookExists = await Book.findById(bookId);
        if (!bookExists) {
            return res.status(404).send({ message: res.__('review.bok_nt_fnd')});
        }

        const newReview = new Review({
            rating,
            review
        });

        await newReview.save();
        res.status(201).send({ message: res.__('review.rvew_sucs')});
    } catch (error) {
        res.status(500).send({ message: error.message  });
    }
}

// Get all reviews for a book
const getReviewsForBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const reviews = await Review.find({ book: bookId });
        res.status(200).json({reviews,message: res.__('review.get_bok_rvew')});
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
            return res.status(404).json({ message: res.__('review.rvew_nt_fnd')});
        }

        existingReview.rating = rating;
        existingReview.review = review;
        await existingReview.save();

        res.status(200).json({ message: res.__('review.rvew_updt'), review: existingReview });
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
            return res.status(404).json({ message: res.__('review.rvew_nt_fnd') });
        }

        res.status(200).json({ message: res.__('review.rvew_delt') });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createReview, getReviewsForBook, updateReview, deleteReview };

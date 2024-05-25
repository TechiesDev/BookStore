const mongoose = require('mongoose');
const { Schema } = mongoose;

// Review Schema
const reviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    bookId: { type: Schema.Types.ObjectId, ref: 'books' },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    reviewDate: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;

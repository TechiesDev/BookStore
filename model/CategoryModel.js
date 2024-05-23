const mongoose = require('mongoose');
const { Schema } = mongoose;


// Category Schema
const categorySchema = new Schema({
  name: { type: String, required: true },
  title: { type: String},
  author: { type: String},
  genre: { type: String},
  ISBN: { type: String, unique: true },
  price: { type: Number},
  description: { type: String},
  publisher: { type: String},
  publicationDate: { type: Date},
  pageCount: { type: Number},
  language: { type: String},
  stock: { type: Number},
  coverImage: { type: String},
  bookId: [{ type: Schema.Types.ObjectId, ref: 'books'}],
  subCategory: [{ type: Schema.Types.ObjectId, ref: 'books'}]
  });


const Category = mongoose.model('categories', categorySchema);

module.exports = Category;

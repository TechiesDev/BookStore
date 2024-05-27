const Book = require('../model/BooksModel');
const { createToken } = require('../utils/Utils');

// Controller function to create a new book
const createBook = async (req, res) => {
  try {
    const {
      bookId,
      bookName,
      title,
      author,
      genre,
      ISBN,
      price,
      description,
      publisher,
      publicationDate,
      pageCount,
      language,
      stock,
      coverImage,
      status,
    } = req.body;

    // Create a new book instance
    const newBook = new Book({bookId,bookName,title,author,genre,ISBN,price,description,publisher,publicationDate,pageCount,language,stock,coverImage,status,});

    
    await newBook.save();
    const token = createToken(newBook);

    res.status(201).json({token,newBook,message: res.__('createbook.crt_bok')});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json({books,message: res.__('createbook.get_al_bok')});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to get a book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json({book,message: res.__('createbook.get_on_bok')});
    } else {
      res.status(404).json({ message: res.__('createbook.bok_n_f') });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to update a book by ID
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: res.__('createbook.bok_n_f') });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete a book by ID
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) {
      res.json({ message: res.__('createbook.bok_delt') });
    } else {
      res.status(404).json({ message: res.__('createbook.bok_n_f') });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createBook, getAllBooks,getBookById, updateBook, deleteBook}
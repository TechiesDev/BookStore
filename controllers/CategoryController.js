const Category = require('../model/CategoryModel');
const { createToken } = require('../utils/Utils');

// Controller function to create a new Category book
const createCategoryBook = async (req, res) => {
  try {
    const { bookName,title,author,genre,ISBN,price,description,publisher,publicationDate,pageCount,
      language,stock,coverImage,bookId,subCategory } = req.body;

    // Create a new  Category book instance
    const newCategory = new Category({bookName,title,author,genre,ISBN,price,description,publisher,publicationDate,pageCount,language,stock,coverImage,bookId,subCategory});

    
    await newCategory.save();
    const token = createToken(newCategory);

    res.status(201).json({token,newCategory,message: res.__('category.crt_catgry')});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all categories
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({categories,message: res.__('category.get_al_catgry')});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: res.__('category.cat_n_f') });
    res.json({category,message: res.__('category.get_cat_byid')});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateCategory = async (req, res) => {
  try {
    const {
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
      bookId,
      subCategory
    } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
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
        bookId,
        subCategory
      },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: res.__('category.cat_n_f') });
    }

    res.status(200).json({ updatedCategory, message: res.__('category.upd_cat') });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: res.__('category.cat_n_f') });
    }
    res.status(200).json({ message: res.__('category.del_cat') });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports ={createCategoryBook,getAllCategory,getCategoryById,updateCategory ,deleteCategory}
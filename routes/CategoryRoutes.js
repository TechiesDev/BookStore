const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const {authenticateToken} = require("../middleware/Authorization");

//--------------------category--------------------

router.post('/createcat',authenticateToken, CategoryController.createCategoryBook);
router.get('/getallcat', authenticateToken,CategoryController.getAllCategory);
router.get('/getcat/:id', authenticateToken,CategoryController.getCategoryById);

router.put('/catupdate/:id', authenticateToken,CategoryController.updateCategory);
router.delete('/catdelete/:id', authenticateToken,CategoryController.deleteCategory);

module.exports = router;
const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

//--------------------category--------------------

router.post('/createcat', CategoryController.createCategoryBook);
router.get('/getcat', CategoryController.getAllCategory);
router.get('/getallcat', CategoryController.getCategoryById);

module.exports = router;
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');
const {authenticateToken} = require("../middleware/Authorization");



// ----------------------------------Books ------------------------------------------------------


router.post('/createbook',authenticateToken, bookController.createBook);
router.get('/allbook',authenticateToken, bookController.getAllBooks);

router.get('/getbook/:id',authenticateToken, bookController.getBookById);
router.put('/updatebook/:id',authenticateToken, bookController.updateBook);
router.delete('/deletebook/:id',authenticateToken, bookController.deleteBook);

module.exports = router;
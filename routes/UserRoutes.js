const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {authenticateToken} = require("../middleware/Authorization");
const {signupValidator,loginValidator,forgetValidator,resetValidator} = require("../middleware/Validator.js");



//-------------------------User----------------------------
router.post('/register',signupValidator,UserController.registerUser);
router.post('/login',loginValidator,UserController.loginUser);

router.get('/getall',authenticateToken,UserController.getAllUser);
router.get('/getbyid/:id',authenticateToken,UserController.getUserById);

router.put('/update/:id',authenticateToken,UserController.updateUser);
router.delete('/delete/:id',authenticateToken,UserController.deleteUser);

// forget and reset password
router.post("/forget",forgetValidator, UserController.forgetPassword); 
router.patch("/reset",resetValidator, UserController.resetPassword);

module.exports = router;
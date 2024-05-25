const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const {signupValidator,loginValidator,forgetValidator,resetValidator} = require("../middleware/Validator.js");



//-------------------------User----------------------------
router.post('/register',signupValidator,UserController.registerUser);
router.post('/login',loginValidator,UserController.loginUser);

// forget and reset password
router.post("/forget",forgetValidator, UserController.forgetPassword);
router.patch("/reset",resetValidator, UserController.resetPassword);

module.exports = router;
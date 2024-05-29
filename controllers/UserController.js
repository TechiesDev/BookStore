const User = require('../model/UserModel');
const { createToken } = require('../utils/Utils');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const { generateResetPasswordMail, sendMail } = require("../utils/Nodemailer");
const { v4: uuidv4 } = require('uuid');


// Controller function to register a new admin
const registerUser = async (req, res) => {
  try {
    const {role,name, email, password, phoneNumber, address, } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: res.__('signup.username_exists') });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({uuid: uuidv4(),role,name, email, password: hashedPassword, phoneNumber, address,});
    await newUser.save();
    const token = createToken(newUser.email, newUser.role);

    res.status(201).json({ token, newUser, message: res.__('signup.signup_success') });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function to login an user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin by username
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: res.__('signin.invalid_credentials')});
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: res.__('signin.invalid_pswrd') });
    }

    const token = createToken(user.email, user.role);

    res.status(200).json({ token, user, message: res.__('signin.signin_sucs') });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { username, email, password, name, address, phoneNumber, role } = req.body;

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username,
        email,
        password: hashedPassword || undefined,
        name,
        address,
        phoneNumber,
        role,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ updatedUser, message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({email: email });
    
    if (!user) {
      return res.status(404).json({ message: res.__('forget.invalid_user') });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const tme = new Date();
    tme.setMinutes(tme.getMinutes() + 10);

    // Update only relevant fields for forget password
    user.otp = hashedOTP;
    user.timeExpire = tme;
    await user.save();

    const mailOptions = generateResetPasswordMail(email, otp);
    await sendMail(mailOptions);

    res.json({ message: res.__("forget.email_sent") });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.otp || new Date() > user.timeExpire || !(await bcrypt.compare(otp, user.otp))) {
      return res.status(400).json({ message: res.__('reset.invalid_credentials_or_expired') });
    }

    user.password = await bcrypt.hash(password, 10);
    user.otp = null;
    user.timeExpire = null;
    await user.save();
    
    res.status(201).json({ message: res.__("reset.password_success") });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {registerUser,
                  loginUser,
                  getAllUser,
                  getUserById,
                  updateUser,
                  deleteUser,
                  forgetPassword,
                  resetPassword
                };

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


// const getAllAdmins = async (req, res) => {
//   try {
//     const admins = await Admin.find();
//     res.status(200).json(admins);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// const getAdminById = async (req, res) => {
//   try {
//     const admin = await Admin.findById(req.params.id);
//     if (!admin) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }
//     res.status(200).json(admin);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// const updateAdminById = async (req, res) => {
//   try {
//     const { username, email, password, name, address, phone, role } = req.body;

//     let hashedPassword;
//     if (password) {
//       hashedPassword = await bcrypt.hash(password, 10);
//     }

//     const updatedAdmin = await Admin.findByIdAndUpdate(
//       req.params.id,
//       {
//         username,
//         email,
//         password: hashedPassword || undefined,
//         name,
//         address,
//         phoneNumber,
//         role
//       },
//       { new: true, runValidators: true }
//     );

//     if (!updatedAdmin) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }

//     res.status(200).json({ updatedAdmin, message: 'Admin updated successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


// const deleteAdminById = async (req, res) => {
//   try {
//     const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
//     if (!deletedAdmin) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }
//     res.status(200).json({ message: 'Admin deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: res.__('forget.invalid_user') });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);
    const tme = new Date();
    tme.setMinutes(tme.getMinutes() + 10);

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
    if (!user) {
      return res.status(400).json({ message: res.__('reset.invalid_user') });
    }
    if (!user.otp) {
      return res.status(403).json({ message: res.__('reset.invalid_otp') });
    }
    const otpMatch = await bcrypt.compare(otp, user.otp);
    const isOtpExpired = new Date() > user.timeExpire;
    
    if (otpMatch && !isOtpExpired) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.otp = null;
      user.timeExpire = null;
      await user.save();
      return res.status(201).json({ message: res.__("reset.password_success") });
    }

    if (!otpMatch) {
      return res.status(400).json({ message: res.__('reset.incorrect_otp') });
    }
    if (isOtpExpired) {
      return res.status(400).json({ message: res.__('reset.expired_otp') });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





module.exports = {registerUser,loginUser,forgetPassword,resetPassword};

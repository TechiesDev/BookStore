const User = require('../model/UserModel');
const { createToken } = require('../utils/Utils');
const bcrypt = require('bcrypt');


// Controller function to register a new admin
const registerUser = async (req, res) => {
  try {
    const {role,name, email, password, phone, address, } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: res.__('signup.username_exists') });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({role,name, email, password: hashedPassword, phone, address,});
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
//         phone,
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

module.exports = {registerUser,loginUser};

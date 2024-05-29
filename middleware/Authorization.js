const jwt = require('jsonwebtoken');
const User = require('../model/UserModel');
require('dotenv').config();

const isAuthenticated = async (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.KEY);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Unauthorized' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }
    next();
};

const authenticateToken = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.KEY, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }
    req.user = decoded;

    // Check if the decoded token has an admin role
    if (decoded.role === 'admin') {
      next();
    } else {
      return res.status(403).json({ error: "Unauthorized: You are not an admin" });
    }
  });
};


const isLogedIn = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    jwt.verify(token, process.env.KEY, async (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        const user = await User.findById(decodedToken.id);
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }
        

        req.user = user;
        next();
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, token not available" });
  }
};

//User AuthenticateUser

const authenticateUser = (req, res, next) => {
  const token = req.headers['token'];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { isAuthenticated, isAdmin, authenticateToken,isLogedIn,authenticateUser };










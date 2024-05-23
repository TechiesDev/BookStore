const jwt = require('jsonwebtoken');
require("dotenv").config();

const key = process.env.KEY;

const createToken = (email,role) => {
  return jwt.sign({ email,role}, key, { expiresIn: "1h" });
};

module.exports = { createToken };
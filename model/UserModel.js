const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

// User Schema
const userSchema = new Schema({
  uuid: { type: String, default: uuidv4, unique: true },
  role: { type: String, enum: ['admin','user'],default:'user' },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  address: { type: String, required: true },
  otp: { type: String},
  timeExpire: { type: Date},
});

const User = mongoose.model("User", userSchema);
module.exports = User;
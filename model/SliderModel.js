const mongoose = require('mongoose');
const { Schema } = mongoose;


const imageSchema = new Schema({
  image: { type: String, required: true },
  
});

const imageData = mongoose.model('imagedata', imageSchema);

module.exports = imageData;

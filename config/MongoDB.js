const mongoose = require("mongoose");

const mongoUrl = "mongodb+srv://exam360:j9T68F5nCpGG29zH@cluster0.dyoqryi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const dbConnection = mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

  module.exports = dbConnection;
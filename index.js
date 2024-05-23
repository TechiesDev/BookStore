const express = require("express");
const dbConnection = require("./config/MongoDB");
const cors = require('cors')
require("dotenv").config();
const port = process.env.PORT;

const Bookes = require("./routes/BookesRoutes");
const category = require("./routes/CategoryRoutes");
const User = require("./routes/UserRoutes");
const imageupload = require("./routes/SliderRoutes");
const {i18n} = require("./middleware/I18Middleware.js")
const app = express();


dbConnection;
app.use(i18n.init);
app.use(express.json());
app.use(cors())

//routes
app.use("/",Bookes,category,User,imageupload);

app.listen(port, () => {
  console.log(`server run on ${port}`);
});
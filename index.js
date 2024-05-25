const express = require("express");
const dbConnection = require("./config/MongoDB");
const cors = require('cors')
const cronjobs = require('./cron/Cron.js');
const Bookes = require("./routes/BookesRoutes");
const category = require("./routes/CategoryRoutes");
const User = require("./routes/UserRoutes");
const Imageupload = require("./routes/SliderRoutes");
const Review = require("./routes/ReviewRoutes.js");
const {i18n} = require("./middleware/I18Middleware.js")

require("dotenv").config();
const port = process.env.PORT;
const app = express();

app.use(i18n.init);
app.use(express.json());
app.use(cors())
dbConnection;
cronjobs;

//routes
app.use("/",Bookes,category,User,Imageupload,Review);

app.listen(port, () => {
  console.log(`server run on ${port}`);
});
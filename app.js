const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//const config = require('./config/config');
const routes = require("./routes/routes");
const app = express();
const PORT = process.env.PORT; //config.PORT
const DB = process.env.DATABASE_URL; //config.DB

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/User", routes);

app.listen(PORT, () => {
  console.log(`app server is listening on port: ${PORT}`);
});

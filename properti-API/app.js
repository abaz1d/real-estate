require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

const { pool } = require("./helpers/util");

pool.connect((err) => {
  if (err) {
    console.log("e database", err);
  }
  console.log("Connect DB successfully");
});

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};

var indexRouter = require("./routes/index")(pool);
var usersRouter = require("./routes/users")(pool);
var propertisRouter = require("./routes/propertis")(pool);

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/properti", propertisRouter);

app.use(allowCrossDomain);
module.exports = app;

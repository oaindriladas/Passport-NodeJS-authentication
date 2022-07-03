const express = require("express"),
  app = express(),
  authRoute = require("./routes/authRoute"),
  postRoute = require("./routes/postRoute"),
  auth = require('./middleware/auth.js')(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  User = require("./model/user"),
  bodyParser = require("body-parser");
  const session = require("express-session");

mongoose.connect("mongodb://localhost:27017/local", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.initialize());
app.use(session({secret: "secret"}));
// Passport Config
passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(authRoute);
app.use(postRoute);

app.listen(3001, () => {
  console.log("Server Started at 3001");
});
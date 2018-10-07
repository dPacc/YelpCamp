// Requiring the libraries
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");


var Campground = require("./models/campground");
var User = require("./models/user");
var comment = require("./models/comment");

// var seedDb = require("./seed");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

var app = express();

// Configuration
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDb();

// Passport Configuration
app.use(require("express-session")({
  secret: "Scooby is the champ!",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Making the user login information available on every page
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments" ,commentRoutes);
app.use("/campgrounds", campgroundRoutes);

// LOCALHOST
app.listen(9090, function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("Running on port 9090!");
  }
});

// Requiring the libraries
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var flash = require("connect-flash");

// Schemas
var Campground = require("./models/campground");
var User = require("./models/user");
var comment = require("./models/comment");

// var seedDb = require("./seed");

// ROUTES
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

var app = express();

// Configuration
// mongoose.connect("mongodb://localhost/yelp_camp_v6");
mongoose.connect("mongodb://yelpuser:abcd1234@ds249839.mlab.com:49839/deepyelpcamp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
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

// Making the user login information available on every page, including the flash messages as well.
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments" ,commentRoutes);
app.use("/campgrounds", campgroundRoutes);

// LOCALHOST
// app.listen(9090, function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("Running on port 9090!");
//   }
// });

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

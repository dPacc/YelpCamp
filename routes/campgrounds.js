var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX ROUTE
router.get("/", function(req, res) {
  Campground.find({}, function(err, obj) {
    if(err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {campgrounds: obj});
    }
  });
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCamp = {name: name, price: price, image: image, description: desc, author: author};
  Campground.create(newCamp, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// SHOW ROUTE
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render("campgrounds/show", {showCamp: foundCampground});
    }
  });
});

//EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, obj) {
          res.render("campgrounds/edit", {editCamp: obj});
    });
});

// UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, obj) {
    if(err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DELETE ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
      if(err) {
        res.redirect("/campgrounds");
      } else {
        res.redirect("/campgrounds");
      }
    });
});

module.exports = router;

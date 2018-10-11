var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var comment = require("../models/comment");
var middleware = require("../middleware");

// COMMENTS NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, obj) {
    if(err) {
      console.log(err);
    } else {
       res.render("comments/new", {cg: obj});
    }
  });
});

// COMMENT CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      comment.create(req.body.comment, function(err, obj) {
        if(err) {
          req.flash("error", "Something went wrong!");
          console.log(err);
        } else {
          obj.author.id = req.user._id;
          obj.author.username = req.user.username;
          obj.save();
          campground.comments.push(obj);
          campground.save();
          req.flash("success", "Successfully added your comment!");
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
});

// COMMENT EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
  comment.findById(req.params.comment_id, function(err, obj) {
    if(err) {
      res.redirect("back");
    } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: obj});
    }
  });
});

// UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
  comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment) {
    if(err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
  comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if(err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted!");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

module.exports = router;

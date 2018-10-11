var Campground = require("../models/campground");
var comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
      Campground.findById(req.params.id, function(err, obj) {
        if(err) {
          req.flash("error", "Campground not found");
          res.redirect("back");
        } else {
          // Does user own the campground?
          if(obj.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You do not have the permission to do that");
            res.redirect("back");
          }
        }
      });
    } else {
      req.flash("error", "You need to be logged in to do that!");
      res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
      comment.findById(req.params.comment_id, function(err, obj) {
        if(err) {
          res.redirect("back");
        } else {
          // Does user own the comment?
          if(obj.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You dont have the permission to do that!");
            res.redirect("back");
          }
        }
      });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    req.flash("error", "You need to be logged in to that!");
    res.redirect("/login");
}

module.exports = middlewareObj;

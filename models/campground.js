// Setting up the Campgrounds SCHEMA
var mongoose = require("mongoose");

var campgroundsSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
      username: String
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

module.exports = mongoose.model("campgrounds", campgroundsSchema);

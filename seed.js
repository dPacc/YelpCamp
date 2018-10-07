var mongoose = require("mongoose");
var Campground = require("./models/campground.js");
var comment = require("./models/comment.js");

// var data = [
//     {
//         name: "Cloud's Rest",
//         image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     },
//     {
//         name: "Desert Mesa",
//         image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     },
//     {
//         name: "Canyon Floor",
//         image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     }
// ]

// function seedDB(){
//   // REMOVING CAMPGROUND
//   Campground.remove({}, function(err, obj) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("Removed campground!");
//       // CREATING CAMPGROUND
//       data.forEach(function(cg) {
//         Campground.create(cg, function(err, campground) {
//           if(err) {
//             console.log(err);
//           } else {
//             console.log("Added a new campground!");
//             // CREATING COMMENT
//             comment.create({
//               text: "This place is great, but I wish there was internet",
//               author: "Homer"
//             }, function(err, comment) {
//               if(err) {
//                 console.log(err);
//               } else {
//                 campground.comments.push(comment);
//                 campground.save();
//                 console.log("Added a new comment");
//               }
//             });
//           }
//         });
//       });
//     }
//   });
// }

// module.exports = seedDB;

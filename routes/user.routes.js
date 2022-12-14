const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const Artwork = require("../models/Artwork.model");
const User = require("../models/User.model")
const fileUploader = require("../config/cloudinary");
const router = require("express").Router();

//path to see user profile
router.get("/user/profile", isLoggedIn, (req, res) => {
  console.log(req.session.user._id)
  User.findById(req.session.user._id)
    .populate('favouriteArt')
    .then((currentUser) => {
      res.render("users/profile", currentUser)
      console.log(currentUser)
    })
    .catch((err) => {
      console.log(err)
    });
});

//path to view edit profile form
router.get("/profile/edit", (req, res, next) => {
  User.findById(req.session.user._id)
    .then((foundUser) => {
      console.log(foundUser)
      res.render("users/profile-edit", foundUser)
    })
    .catch(err => { console.log(err) })
})

//path to process edit profile form
router.post("/profile/edit", (req, res, next) => {
  const userDetails = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userCountry: req.body.userCountry,
  };

  User.findByIdAndUpdate(req.session.user._id, userDetails)
    .then(() => { return res.redirect(`/user/profile`) })
    .catch(err => console.log(err))

})


module.exports = router;
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const Artwork = require("../models/Artwork.model");
const User = require("../models/User.model")
const fileUploader = require("../config/cloudinary");

const router = require("express").Router();





router.get("/user/profile", isLoggedIn, (req, res) => {
    console.log(req.session.user._id)
      User.findById(req.session.user._id)
      .populate('favouriteArt')
        .then((currentUser) => {
    res.render("users/profile", currentUser)
    console.log(currentUser)
        })
        .catch((err) => {console.log(err)
          });
        });

        

router.get("/profile/edit", (req,res,next) =>
res.render("users/profile-edit"))



router.post("/profile/edit", (req,res,next) => {
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
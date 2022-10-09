const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const Artwork = require("../models/Artwork.model");


//CREATE: display form
const router = require("express").Router()
router.get("/artwork/create", (req, res,next) => {
    res.render("artwork/artwork-create");
})

// CREATE: post process form 

router.post("/artwork/create", (req, res, next) => {
  
    const artworkDetails = {
      title: req.body.title,
      description: req.body.description,
      artist: req.body.artist,
      date: req.body.date,
    }
  
    Artwork.create(artworkDetails)
      .then(artworkDetails => {
        res.redirect("/");
      })
      .catch(err => {
        console.log("error creating new artwork in DB", err);
        next(err);
      })
  
  });




module.exports = router;
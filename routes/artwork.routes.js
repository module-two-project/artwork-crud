const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const Artwork = require("../models/Artwork.model");

//CREATE: display form
const router = require("express").Router();

router.get("/artwork/create", isLoggedIn, (req, res, next) => {
    res.render("artwork/artwork-create");
});

// CREATE: post process form

router.post("/artwork/create", isLoggedIn, (req, res, next) => {
    const artworkDetails = {
        title: req.body.title,
        description: req.body.description,
        artist: req.body.artist,
        date: req.body.date,
    };

    Artwork.create(artworkDetails)
        .then((artworkDetails) => {
            res.redirect("/artwork");
        })
        .catch((err) => {
            console.log("error creating new artwork in DB", err);
            next(err);
        });
});

//View all artwork

router.get("/artwork", (req, res, next) => {
    Artwork.find()
        .then((artworkFromDB) => {
            res.render("artwork/artwork-list", { artwork: artworkFromDB });
        })
        .catch((err) => {
            console.log(err);
            next();
        });
});

//Show Artwork Details
router.get("/artwork/:artworkId", (req, res, next) => {
    const artworkId = req.params.artworkId;

    Artwork.findById(artworkId)
        .then(artworkDetails => {
            res.render("artwork/artwork-details", artworkDetails);
        })
        .catch(err => {
            next();
        })
});








//Update Artwork Info 
router.get("/artwork/:artworkID/update", isLoggedIn, (req,res,next)=> {
    Artwork.findById(req.params.artworkID)
    .then((artworkDetails) =>{
        res.render("artwork/artwork-update", artworkDetails);
    })
    .catch(err =>{
        console.log("Error getting book details from DB...", err)
        next();
    })
})

// update: post
router.post("/artwork/:artworkId/update", isLoggedIn, (req, res, next) => {
    const artworkId = req.params.artworkId
    const newDetails = {
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        artist: req.body.artist
    }
    Artwork.findByIdAndUpdate(artworkId, newDetails)
        .then(() => { res.redirect(`/artwork/${artworkId}`) })
        .catch(err => console.log(err))
    next()
})

// DELETE
router.post("/artwork/:artworkId/delete", isLoggedIn, (req, res, next) => {
    Artwork.findByIdAndDelete(req.params.artworkId)
        .then(() => {
            res.redirect("/artwork");
        })
        .catch(err => {
            next();
        })
})



module.exports = router;

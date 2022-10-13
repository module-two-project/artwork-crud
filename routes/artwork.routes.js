const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const Artwork = require("../models/Artwork.model");
const fileUploader = require("../config/cloudinary");
const User = require("../models/User.model");


const router = require("express").Router();

//CREATE: display form
router.get("/artwork/create", isLoggedIn, (req, res, next) => {
    res.render("artwork/artwork-create");
});

// CREATE: post process form

router.post("/artwork/create", isLoggedIn, fileUploader.single('artworkPictureUrl'), (req, res, next) => {
    const artworkDetails = {
        title: req.body.title,
        description: req.body.description,
        artist: req.body.artist,
        date: req.body.date,
        artworkPictureUrl: req.file.path,
        user: req.user.username

    };
console.log(req.user.username)
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
    //console.log(req.session.user)

    Artwork.findById(artworkId)
        .then(artworkDetails => {
            res.render("artwork/artwork-details", artworkDetails);
           // console.log(artworkDetails.user)
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
router.post("/artwork/:artworkId/update", isLoggedIn, fileUploader.single('artworkPictureUrl'), (req, res, next) => {
    console.log(req.body.artworkPictureUrl)
    const artworkId = req.params.artworkId
    const newDetails = {
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
        artist: req.body.artist,
        artworkPictureUrl: req.file.path,
        user: req.user.username

    }
    Artwork.findByIdAndUpdate(artworkId, newDetails)
        .then(() => { return res.redirect(`/artwork/${artworkId}`) })
        .catch(err => console.log(err))
    //next()
})

// DELETE
router.post("/artwork/:artworkId/delete", isLoggedIn, (req, res, next) => {
    Artwork.findById(req.params.artworkId)
    .then((artworkFromDB) => {
        console.log(req.session.user.username)
        console.log(artworkFromDB.user)
        if(artworkFromDB.user !== req.session.user.username){
         return res.send('sorry only creator can delete')
        } else {
            Artwork.findByIdAndDelete(req.params.artworkId)
            .then(() => {
                res.redirect("/artwork");
            })
            .catch(err => {
                next();
            })
        }
    })

})

router.post("/artwork/:artworkId/favourite", isLoggedIn, (req,res, next)=> {
    Artwork.findById(req.params.artworkId)
    .then((artworkFromDB) => {
       User.findOneAndUpdate({username: req.session.user.username}, {$push: {favouriteArt:artworkFromDB}})
       .then(()=> {res.redirect("/user/profile")
})
            })
            .catch(err => {
                next();
            })
        })




module.exports = router;

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const Artwork = require("../models/Artwork.model");
const fileUploader = require("../config/cloudinary");
const User = require("../models/User.model");
const { findById } = require("../models/Artwork.model");


const router = require("express").Router();

//CREATE: display form
router.get("/artwork/create", isLoggedIn, (req, res, next) => {
    res.render("artwork/artwork-create");
});

// CREATE: post process form

router.post("/artwork/create", isLoggedIn, fileUploader.single('artworkPictureUrl'), (req, res, next) => {
    const {title,description,artist,date} = req.body;
    if (!title || !description || !artist || !date || !req.file) {
        return res
        .status(400)
        .render("artwork/artwork-create", { errorMessage: "Please fill in all fields."})

      }
    const artworkPictureUrl=req.file.path;
console.log(artworkPictureUrl)
const user = req.user.username;

      

    Artwork.create({title,description,date,artist,artworkPictureUrl,user})
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
    const artworkId = req.params.artworkId
    const {title, description, artist, date} = req.body
    let artworkPictureUrl
    if(!req.file){
Artwork.findById(artworkId)
.then(foundArt=>{
    artworkPictureUrl=foundArt.artworkPictureUrl
    console.log('this is', foundArt)})





    } else {artworkPictureUrl = req.file.path}

    Artwork.findByIdAndUpdate(artworkId, {title, description, artist, date, artworkPictureUrl: artworkPictureUrl})
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
         res.render('artwork/artwork-deletion-err', {errorMessage: 'Sorry, art can only be deleted by the user who created it.'})
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
       .then((result)=> {res.redirect("/user/profile")
       console.log(result)
})
            })
            .catch(err => {
                next();
            })
        })


        router.post("/artwork/:artworkId/remove", isLoggedIn, (req,res, next)=> {
            Artwork.findById(req.params.artworkId)
            .then(async (artworkFromDB) => {
                const result = await User.findOneAndUpdate({ username: req.session.user.username }, { $pull: { favouriteArt: req.params.artworkId } });
                res.redirect("/artwork");
                console.log(result);
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })

module.exports = router;

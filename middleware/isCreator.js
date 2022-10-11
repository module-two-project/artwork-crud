const e = require("express");
const ArtworkModel = require("../models/Artwork.model");

module.exports = (req, res, next) => {
    ArtworkModel.findById(req.params.artworkId)
    .then((artworkFromDB) => {
        console.log(req.session.user.username)
        console.log(artworkFromDB.user)
        if(artworkFromDB.user.username !== req.session.user){
            return res.send('sorry only creator can delete')
        } next();
    })
    
  
    
    // checks if the user is logged in when trying to access a specific page
}

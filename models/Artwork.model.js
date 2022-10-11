const { Schema, model } = require('mongoose');

const artWorkSchema = new Schema (
    {
        title: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            
        },
        description: {
            type: String,
            required: true,
        },
        artist: {
            type: String,
            required: true,
        },
        artworkPictureUrl: {
            type: String,
            required: true,
        },
        user:{
            type: String,
        }

    },
    {
        timestamps: true
    }
);

module.exports = model('Artwork', artWorkSchema);
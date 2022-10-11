const { Schema, model } = require('mongoose');

const artWorkSchema = new Schema (
    {
        title: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            //required: true,
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
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Artwork', artWorkSchema);
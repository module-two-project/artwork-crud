const { Schema, model } = require('mongoose');

const artWorkSchema = new Schema (
    {
        title: String,
        date: Date,
        description: String,
        artist: String,
    },
    {
        timestamps: true
    }
);

module.exports = model('Artwork', artWorkSchema);
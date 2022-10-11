const { Schema, model } = require('mongoose');

const artWorkSchema = new Schema (
    {
        title: String,
        date: Date,
        description: String,
        artist: String,
        image: {
            data: Buffer,
            contentType: String,
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Artwork', artWorkSchema);
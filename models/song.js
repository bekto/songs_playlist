const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const songSchema = new mongoose.Schema({
    artist: String,
    songTitle: String,
    year: String,
    genre: String
});

songSchema.plugin(paginate);

module.exports = mongoose.model('Song',songSchema);
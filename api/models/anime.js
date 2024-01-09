const mongoose = require("mongoose");

const animeSchema = mongoose.Schema({
    title: String,
    studio: String,
    release: Number,
});

module.exports = mongoose.model("Anime", animeSchema);
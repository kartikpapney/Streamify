const mongoose = require("mongoose");
const db = require("../db");

const DEFAULT_TEXT=`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
const movieSchema = mongoose.Schema({
    ImgLink: {
        type: String, required: true
    },
    pageLink: {
        type: String, required: true
    },
    text: { type: String, required: false, default: DEFAULT_TEXT },
    title: { type: String, required: true },
});

module.exports = db.model('Movie', movieSchema);
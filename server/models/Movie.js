const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
    thumbnail: {
        type: String, required: true
    },
    link: {
        type: String, required: true
    },
    title: { type: String, required: true },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ]
});

module.exports = mongoose.model('Movie', MovieSchema);
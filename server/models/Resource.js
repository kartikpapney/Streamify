const mongoose = require("mongoose");

const ResourceSchema = mongoose.Schema({
    platform: {
        type: String, required: true
    },
    thumbnail: {
        type: String, required: true
    },
    link: {
        type: String, required: true, unique: true, index: true
    },
    title: { type: String, required: true },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ]
});

module.exports = mongoose.model('Resource', ResourceSchema);
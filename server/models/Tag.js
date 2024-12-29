const mongoose = require("mongoose");

const TagSchema = mongoose.Schema({
    tag: { type: String, unique: true, index: true }
});

module.exports = mongoose.model('Tag', TagSchema);
const mongoose = require("mongoose");

const TagSchema = mongoose.Schema({
    tag: { type: String, unique: true, index: true },
    accessed_at: {type: Date, index: true, default: new Date() }
});

module.exports = mongoose.model('Tag', TagSchema);
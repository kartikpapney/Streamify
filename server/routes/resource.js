require("dotenv").config();

const express = require("express");
const router = express.Router();
const Resource = require("../models/Resource");
const Tag = require("../models/Tag");

router.get("/tags", async (req, res) => {
    try {
        const data = await Tag.find({});
        res.status(200).json({data});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const { tag, title, page=1 } = req.query;

        const PER_PAGE = 8;

        const query = { platform: { $ne: "Deleted" } }
        if(title) query["title"] = { $regex: title, $options: 'i' };
        if(tag) query["tags"] = tag
        const [
            data,
            count
        ] = await Promise.all([
            Resource.find(query).populate("tags").skip((page-1)*PER_PAGE).limit(PER_PAGE),
            Resource.find(query).countDocuments()
        ]);
        res.status(200).json({data, count});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const data = await Resource.findById(req.params.id).populate("tags");
        if (data) {
            res.status(200).json({data});
        } else {
            res.status(404).json({ message: 'Resource not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

router.put("/:id", async (req, res) => {
    const movieId = req.params.id;
    const { thumbnail, title, link, tags } = req.body;
    try {
        const updatedMovie = await Resource.findByIdAndUpdate(
            movieId,
            {
                thumbnail, title, link, tags
            },
            { new: true }
        );

        if (updatedMovie) {
            res.json(updatedMovie);
        } else {
            res.status(404).json({ message: 'Resource not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

router.delete("/:id", async (req, res) => {
    const movieId = req.params.id;
    try {
        const deletedMovie = await Resource.findByIdAndRemove(movieId);
        if (deletedMovie) {
            res.status(200).json({ message: 'Resource deleted successfully' });
        } else {
            res.status(404).json({ message: 'Resource not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occured' });
    }
});

router.delete("/", async (req, res) => {
    
    try {
        const deletedTags = await Tag.deleteMany({});
        const deletedMovie = await Resource.deleteMany({});
        if (deletedTags && deletedMovie) {
            res.status(200).json({ message: 'Resources deleted successfully' });
        } else {
            res.status(404).json({ message: 'Resources not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occured' });
    }
});

module.exports = router;
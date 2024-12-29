require("dotenv").config()
const axios = require('axios');
const cheerio = require('cheerio');

function extractVideoId(url) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId || null;
}

async function getVideoDetails(link, tags) {
    const videoId = extractVideoId(link);
    if (!videoId) {
        console.log('Invalid YouTube video link.');
        return;
    }

    const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    try {

        const response = await axios.get(link);
        const $ = cheerio.load(response.data);
        const title = $("meta[name='title']").attr("content");

        const data = await axios.post("http://localhost:3001/api/movies/", { thumbnail: thumbnail, title: title, link: link, tags: tags}, {headers: {Authorization: `Bearer ${process.env.PLAYLIST_TOKEN}`}})

    } catch (error) {
        console.error('Error fetching video details:', error);
    }
}

const tags = process.argv.slice(3);
const link = process.argv[2] || "https://www.youtube.com/watch?v=CYi5g3wz4AI&ab_channel=SamayRaina";
getVideoDetails(link, tags);
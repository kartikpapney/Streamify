const axios = require("axios")
const cheerio = require("cheerio")

class Item {
    constructor(platform, link, title, thumbnail, tags = "") {
        this.platform = platform;
        this.link = link;
        this.title = title;
        this.thumbnail = thumbnail;
        this.tags = tags;
    }

    static async getItem(link = "", tags = [], platform) {
        if(link.includes("medium")) {
            return await this.getMediumVideoItem(link, tags, platform);
        } else if(link.includes("youtube")) {
            return await this.getYoutubeVideoItem(link, tags, platform)
        } else {
            return new Item(
                platform,
                link,
                "Unknown",
                "",
                tags.join(", "),
            )
        }   

    }

    static async getYoutubeVideoItem(link = "", tags = [], platform) {
        const videoId = link.split('v=')[1]?.split('&')[0];
        if (!videoId) {
            console.log('Invalid YouTube video link.');
            return;
        }
    
        const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    
        try {
    
            const response = await axios.get(link);
            const $ = cheerio.load(response.data);
            const title = $("meta[name='title']").attr("content");
    
            return new Item(
                platform,
                link,
                title,
                thumbnail,
                tags.join(", "),
            )
        } catch (error) {
            console.error('Error fetching video details:', error);
        }
    }

    static async getMediumVideoItem(link = "", tags = [], platform) {
        try {
            const { data } = await axios.get(link);
            
            const $ = cheerio.load(data);
            const title = $('meta[property="og:title"]').attr('content') || $('title').text();
            const thumbnail = $('meta[property="og:image"]').attr('content');
    
            return new Item(
                platform,
                link,
                title,
                thumbnail,
                tags.join(", "),
            )
        } catch (error) {
            console.error('Error fetching Medium article:', error);
        }
    }


    getDetailsArray() {
        return [
            this.platform,
            this.link,
            this.title,
            this.thumbnail,
            this.tags
        ];
    }

}

module.exports = Item
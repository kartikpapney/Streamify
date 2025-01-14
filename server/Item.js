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

    static async getItem(platform, link, title, thumbnail, tags) {
        if(link.includes("medium")) {
            return await this.getMediumVideoItem(platform, link, title, thumbnail, tags);
        } else if(link.includes("youtube")) {
            return await this.getYoutubeVideoItem(platform, link, title, thumbnail, tags)
        } else {
            return new Item(
                platform,
                link,
                title || "Unknown",
                thumbnail || "",
                tags.join(", "),
            )
        }   

    }

    static async getYoutubeVideoItem(platform, link, title, thumbnail, tags) {

        return new Promise((resolve, reject) => {
            const videoId = link.split('v=')[1]?.split('&')[0];
            if (!videoId) {
                console.log('Invalid YouTube video link.');
                return;
            }
        
            thumbnail = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        
            try {
                if(!title) {
                    const https = require('https');
                    const querystring = require('querystring');
                    const videoID = videoId;
                    
                    const params = {
                        format: 'json',
                        url: `https://www.youtube.com/watch?v=${videoID}`
                    };
                    
                    const url = `https://www.youtube.com/oembed?${querystring.stringify(params)}`;
                    
                    https.get(url, (response) => {
                        let data = '';
                        response.on('data', (chunk) => {
                            data += chunk;
                        });
                    
                        response.on('end', () => {
                            const parsedData = JSON.parse(data);
                            resolve(new Item(
                                platform,
                                link,
                                parsedData.title,
                                thumbnail,
                                tags.join(", "),
                            ))
                        });
                    
                    }).on('error', (error) => {
                        console.error('Error:', error);
                    }); 
                } else {
                    resolve(new Item(
                        platform,
                        link,
                        title,
                        thumbnail,
                        tags.join(", "),
                    ))
                }
            } catch (error) {
                console.error('Error fetching video details:', error);
                reject(error);
            }
        })
        
    }

    static async getMediumVideoItem(platform, link, title, thumbnail, tags) {
        try {
            const { data } = await axios.get(link);
            
            const $ = cheerio.load(data);
            title = title || $('meta[property="og:title"]').attr('content') || $('title').text();
            thumbnail = thumbnail || $('meta[property="og:image"]').attr('content');
    
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
const { CronJob } = require('cron');
const { google } = require('googleapis');

const Resource = require("./models/Resource");
const Tag = require("./models/Tag");

const Item = require('./Item');

const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const SHEET_PRIVATE_KEY = process.env.SHEET_PRIVATE_KEY;
const SHEET_SPREADSHEET_ID = process.env.SHEET_SPREADSHEET_ID;
const SHEET_PAGE = process.env.SHEET_PAGE;
const CRON_TIMING = process.env.CRON_TIMING ?? '0 * * * * *';

const googleAuth = new google.auth.JWT(
    CLIENT_EMAIL,
    null,
    SHEET_PRIVATE_KEY.replace(/\\n/g, '\n'),
    'https://www.googleapis.com/auth/spreadsheets'
);

async function upsertDB([platform, link, title, thumbnail, tagString = ""]) {
    const tags = tagString.split(", ");
    try {
        const operations = tags.filter((tag) => tag).map((tag) => ({
            updateOne: {
                filter: { tag }, 
                update: { $setOnInsert: { tag } }, 
                upsert: true 
            }
        }));
    
        await Tag.bulkWrite(operations);
        const tagsId = (await Tag.find({ tag: { $in: tags } }, { _id: 1 })).map(({ _id }) => _id);

        await Resource.updateOne({link}, { $set: {thumbnail, title, link, tags: tagsId, platform} }, {upsert: true});
        console.log(`updated ${title} in database`)
    } catch (err) {
        console.log(`error while updating ${title}information in db`, err);
    }
}

async function getSheet() {

    const sheetInstance = await google.sheets({ version: 'v4', auth: googleAuth});

    const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
        auth: googleAuth,
        spreadsheetId: SHEET_SPREADSHEET_ID,
        range: `${SHEET_PAGE}!A2:E`
    });
    
    return infoObjectFromSheet.data.values;
    
}
async function updateInformation(data) {
    try {

        data.forEach(async ([platform,link,title,thumbnail, tags = []], idx) => {
            try {
                const sheetInstance = await google.sheets({ version: 'v4', auth: googleAuth });
            
                const item = await Item.getItem(platform, link, title, thumbnail, tags.split(", "));
                const updateToGsheet = [
                    item.getDetailsArray()  
                ];

                const rowIndex = idx + 2; 
                const range = `${SHEET_PAGE}!A${rowIndex}:E${rowIndex}`; 

                await sheetInstance.spreadsheets.values.update({
                    auth: googleAuth,
                    spreadsheetId: SHEET_SPREADSHEET_ID,
                    range: range,  
                    valueInputOption: 'RAW',
                    resource: {
                        values: updateToGsheet,
                    },
                });
                await upsertDB([item.platform, item.link, item.title, item.thumbnail, item.tags])
                console.log(`updated ${item.title} in sheets`);
            } catch (err) {
                console.log(`error while updating ${title}`, err);
            }
        })

    } catch (err) {
        console.log("error while updating information in sheets", err);
    }
}


const job = new CronJob(
	CRON_TIMING,
	async function () {
		const data = await getSheet()
        await updateInformation(data)
	},
	null, 
	false
);

module.exports = {
    job
}
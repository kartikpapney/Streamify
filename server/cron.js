const { CronJob } = require('cron');
const { google } = require('googleapis');

const Resource = require("./models/Resource");
const Tag = require("./models/Tag");

const Item = require('./Item');

const clientEmail = process.env.CLIENT_EMAIL;
const privateKey = process.env.SHEET_PRIVATE_KEY;
const googleSheetId = process.env.SHEET_SPREADSHEET_ID;
const googleSheetPage = process.env.SHEET_PAGE;

const googleAuth = new google.auth.JWT(
    clientEmail,
    null,
    privateKey.replace(/\\n/g, '\n'),
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
        console.log("updated in database")
    } catch (err) {
        console.log("error", err);
    }
}

async function getSheet() {

    const sheetInstance = await google.sheets({ version: 'v4', auth: googleAuth});

    const infoObjectFromSheet = await sheetInstance.spreadsheets.values.get({
        auth: googleAuth,
        spreadsheetId: googleSheetId,
        range: `${googleSheetPage}!A2:E`
    });
    
    return infoObjectFromSheet.data.values;
    
}
async function updateSheet(data) {
    try {

        data.forEach(async ([platform,link,title,thumbnail, tags = []], idx) => {
            const sheetInstance = await google.sheets({ version: 'v4', auth: googleAuth });
            
            const item = await Item.getItem(platform, link, title, thumbnail, tags.split(", "));
            const updateToGsheet = [
                item.getDetailsArray()  
            ];

            const rowIndex = idx + 2; 
            const range = `${googleSheetPage}!A${rowIndex}:E${rowIndex}`; 

            await sheetInstance.spreadsheets.values.update({
                auth: googleAuth,
                spreadsheetId: googleSheetId,
                range: range,  
                valueInputOption: 'RAW',
                resource: {
                    values: updateToGsheet,
                },
            });

            console.log(`Updated row ${rowIndex}`);
        })

    } catch (err) {
        console.log("updateSheet function error", err);
    }
}


const job = new CronJob(
	'0 * * * *',
	async function () {
		const data = await getSheet()
        await updateSheet(data)
        const mdata = await getSheet();
        mdata.map(async(data) => {
            await upsertDB(data)
        })
	},
	null, 
	false
);

module.exports = {
    job
}
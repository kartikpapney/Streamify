const mongoose = require("mongoose");

module.exports = {
    connect: async function() {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useunifiedTopology: true,
        });
        
        const db = mongoose.connection;
        
        db.on('error', console.error.bind(console, 'mongodb connection error'));
        db.once('open', () => {
            console.info('mongodb connected');
        });
        // db.on('close', console.info("mongodb disconnected"))       
    }
}
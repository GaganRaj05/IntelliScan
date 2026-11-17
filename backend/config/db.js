const mongoose = require('mongoose');

async function connectToDb(url) {
    try {
        await mongoose.connect(url);
        console.log("Mongodb connection successfull");
    
    }
    catch(err) {
        console.log(url)
        console.log(err.message);
        throw err
    }
}
module.exports = connectToDb;
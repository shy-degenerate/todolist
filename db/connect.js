const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

async function connectDB() {
    const options = {
        
    };
    return mongoose.connect(uri, options);
}

module.exports = connectDB;
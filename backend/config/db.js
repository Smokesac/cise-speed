// db.js

const mongoose = require('mongoose');
const config = require('config');
const db = process.env.mongoURI;

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true, // Add this option to address the deprecation warning
        });

        console.log('MongoDB is Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

const mongoose = require('mongoose');
const { DB_URI } = require('../configs/config');

async function connectDB() {
    try {
        await mongoose.connect(DB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = { connectDB };

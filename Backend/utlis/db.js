const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 20000,
            connectTimeoutMS: 20000, 
        });
        console.log('MongoDB connected successfully');
        
        // Optional: Log connection events for debugging
        mongoose.connection.on('connected', () => console.log('Mongoose connected to DB'));
        mongoose.connection.on('error', (err) => console.log('Mongoose connection error:', err));
        mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1); // Exit process on failure
    }
};

module.exports = connectDB;
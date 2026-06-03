const mongoose = require('mongoose');

/*
 * Connects the application to the MongoDB database
 * using the connection string defined in the .env file.
 */
const connectDB = async () => {
    try {
        // Establish connection to MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        // Log successful connection
        console.log('MongoDB Connected');
    } catch (error) {
        // Log connection error details
        console.error('MongoDB connection error:', error.message);

        // Terminate application if database connection fails
        process.exit(1);
    }
};

// Export database connection function
module.exports = connectDB;
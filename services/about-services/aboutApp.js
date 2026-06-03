// Load environment variables from .env file
require('dotenv').config();

const connectDB = require('../../config/db');
const logRequest = require('../../middleware/logMiddleware');
const express = require('express');

const aboutRoutes = require('../../routes/aboutRoutes');

// Create Express application instance
const app = express();

// Connect to MongoDB database
connectDB();

// Enable JSON request body parsing
app.use(express.json());

// Register logging middleware
app.use(logRequest);

// Register About service routes under /api
app.use('/api', aboutRoutes);

/*
 * Root endpoint used to verify that
 * the About service is running.
 */
app.get('/', (req, res) => {
    res.json({
        message: 'About Service is running'
    });
});

// Define application port
const PORT = process.env.PORT || process.env.ABOUT_PORT || 3003;

// Start the server
app.listen(PORT, () => {
    console.log(`About Service running on port ${PORT}`);
});
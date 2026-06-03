// Load environment variables from .env file
require('dotenv').config();

const express = require('express');

const connectDB = require('../../config/db');

const logsRoutes = require('../../routes/logsRoutes');

// Create Express application instance
const app = express();

// Connect to MongoDB database
connectDB();

// Enable JSON request body parsing
app.use(express.json());

// Register Logs service routes under /api
app.use('/api', logsRoutes);

/*
 * Root endpoint used to verify that
 * the Logs service is running.
 */
app.get('/', (req, res) => {
    res.json({
        message: 'Logs Service is running'
    });
});

// Define application port
const PORT = process.env.PORT || process.env.LOGS_PORT || 3002;

// Start the server
app.listen(PORT, () => {
    console.log(`Logs Service running on port ${PORT}`);
});
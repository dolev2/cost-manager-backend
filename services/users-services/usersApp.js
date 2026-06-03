// Load environment variables from .env file
require('dotenv').config();

const logRequest = require('../../middleware/logMiddleware');
const express = require('express');

const connectDB = require('../../config/db');
const usersRoutes = require('../../routes/usersRoutes');

// Create Express application instance
const app = express();

// Connect to MongoDB database
connectDB();

// Enable JSON request body parsing
app.use(express.json());

// Register logging middleware
app.use(logRequest);

// Register Users service routes under /api
app.use('/api', usersRoutes);

/*
 * Root endpoint used to verify that
 * the Users service is running.
 */
app.get('/', (req, res) => {
    res.json({
        message: 'Users Service is running'
    });
});

// Define application port
const PORT = process.env.PORT || process.env.USERS_PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Users Service running on port ${PORT}`);
});
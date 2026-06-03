const costsRoutes = require('../../routes/costsRoutes');

// Load environment variables from .env file
require('dotenv').config();

const logRequest = require('../../middleware/logMiddleware');

const express = require('express');

const connectDB = require('../../config/db');

// Create Express application instance
const app = express();

// Connect to MongoDB database
connectDB();

// Enable JSON request body parsing
app.use(express.json());

// Register logging middleware
app.use(logRequest);

// Register Costs service routes under /api
app.use('/api', costsRoutes);

/*
 * Root endpoint used to verify that
 * the Costs service is running.
 */
app.get('/', (req, res) => {
    res.json({
        message: 'Costs Service is running'
    });
});

// Define application port
const PORT = process.env.PORT || process.env.COSTS_PORT || 3001;

// Start the server
app.listen(PORT, () => {
    console.log(`Costs Service running on port ${PORT}`);
});
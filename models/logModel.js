const mongoose = require('mongoose');

/*
 * Schema for storing application log entries
 * in the logs collection.
 */
const logSchema = new mongoose.Schema({
    // HTTP request method (GET, POST, etc.)
    method: {
        type: String,
        required: true
    },

    // Requested URL path
    url: {
        type: String,
        required: true
    },

    // HTTP response status code
    status: {
        type: Number
    },

    // Log message description
    message: {
        type: String
    },

    // Date and time when the log entry was created
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export Log model
module.exports = mongoose.model('Log', logSchema);
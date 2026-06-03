const Log = require('../models/logModel');

/*
 * Retrieves all log entries from the database.
 */
const getLogs = async (req, res) => {
    try {
        // Fetch all logs from the logs collection
        const logs = await Log.find({});

        // Return logs as JSON response
        res.json(logs);
    } catch (error) {
        // Return server error response
        res.status(500).json({
            id: 'get_logs_error',
            message: error.message
        });
    }
};

// Export controller function
module.exports = {
    getLogs
};
const Log = require('../models/logModel');

const getLogs = async (req, res) => {
    try {
        const logs = await Log.find({});
        res.json(logs);
    } catch (error) {
        res.status(500).json({
            id: 'get_logs_error',
            message: error.message
        });
    }
};

module.exports = {
    getLogs
};
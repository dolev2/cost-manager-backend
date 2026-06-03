const express = require('express');

const {
    getLogs
} = require('../controllers/logsController');

// Create Express router instance
const router = express.Router();

// Route for retrieving all log entries
router.get('/logs', getLogs);

// Export router
module.exports = router;
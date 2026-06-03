const express = require('express');

const {
    addCost, getReport
} = require('../controllers/costsController');

// Create Express router instance
const router = express.Router();

// Route for adding a new cost item
router.post('/add', addCost);

// Route for generating or retrieving a monthly report
router.get('/report', getReport);

// Export router
module.exports = router;
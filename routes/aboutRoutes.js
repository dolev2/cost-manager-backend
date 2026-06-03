const express = require('express');

const {
    getAbout
} = require('../controllers/aboutController');

// Create Express router instance
const router = express.Router();

// Route for retrieving team member information
router.get('/about', getAbout);

// Export router
module.exports = router;
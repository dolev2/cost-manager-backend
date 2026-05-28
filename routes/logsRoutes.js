const express = require('express');

const {
    getLogs
} = require('../controllers/logsController');

const router = express.Router();

router.get('/logs', getLogs);

module.exports = router;
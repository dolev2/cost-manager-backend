const express = require('express');

const {
    addCost, getReport
} = require('../controllers/costsController');

const router = express.Router();

router.post('/add', addCost);
router.get('/report', getReport);

module.exports = router;
const mongoose = require('mongoose');

/*
 * Schema for storing generated monthly reports.
 * Each report contains user information,
 * report date, and categorized cost data.
 */
const reportSchema = new mongoose.Schema({
    // User identifier
    userid: Number,

    // Report year
    year: Number,

    // Report month
    month: Number,

    // Categorized costs included in the report
    costs: Array
});

// Export Report model
module.exports = mongoose.model('Report', reportSchema);
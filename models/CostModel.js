const mongoose = require('mongoose');

/*
 * Schema for storing cost items in the costs collection.
 */
const costSchema = new mongoose.Schema({
    // Description of the cost item
    description: {
        type: String,
        required: true
    },

    // Category of the cost item
    category: {
        type: String,
        required: true
    },

    // ID of the user who owns the cost
    userid: {
        type: Number,
        required: true
    },

    // Cost amount
    sum: {
        type: Number,
        required: true
    },

    // Date and time when the cost was created
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export Cost model
module.exports = mongoose.model('Cost', costSchema);
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    method: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    status: {
        type: Number
    },

    message: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Log', logSchema);
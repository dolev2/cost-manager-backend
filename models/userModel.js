const mongoose = require('mongoose');

/*
 * Schema for storing user information
 * in the users collection.
 */
const userSchema = new mongoose.Schema({
    // Unique user identifier
    id: {
        type: Number,
        required: true,
        unique: true
    },

    // User's first name
    first_name: {
        type: String,
        required: true
    },

    // User's last name
    last_name: {
        type: String,
        required: true
    },

    // User's date of birth
    birthday: {
        type: Date,
        required: true
    }
});

// Export User model
module.exports = mongoose.model('User', userSchema);
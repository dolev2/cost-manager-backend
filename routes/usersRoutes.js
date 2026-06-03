const express = require('express');

const {
    getUsers,
    addUser, getUserById
} = require('../controllers/usersController');

// Create Express router instance
const router = express.Router();

// Route for retrieving all users
router.get('/users', getUsers);

// Route for creating a new user
router.post('/add', addUser);

// Route for retrieving a specific user by ID
router.get('/users/:id', getUserById);

// Export router
module.exports = router;
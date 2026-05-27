const express = require('express');

const {
    getUsers,
    addUser, getUserById
} = require('../controllers/usersController');

const router = express.Router();

router.get('/users', getUsers);
router.post('/add', addUser);
router.get('/users/:id', getUserById);

module.exports = router;
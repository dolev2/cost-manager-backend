const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/:id', async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await User.findOne({ id: userId });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
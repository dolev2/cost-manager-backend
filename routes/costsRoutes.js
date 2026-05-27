const express = require('express');
const router = express.Router();
const Cost = require('../models/costModel');
const User = require('../models/userModel');

router.post('/add', async (req, res) => {
    try {
        const { user_id, category, description, amount, date } = req.body;

        if (!user_id || !category || !description || !amount) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const userExists = await User.findOne({ id: user_id });
        if (!userExists) {
            return res.status(404).json({ error: 'User not found. Cannot add cost.' });
        }

        const newCost = new Cost({
            user_id,
            category,
            description,
            amount,
            date: date || new Date()
        });

        await newCost.save();
        res.status(201).json(newCost);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
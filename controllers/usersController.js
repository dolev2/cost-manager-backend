const User = require('../models/userModel');
const Cost = require('../models/costModel');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({
            id: 'get_users_error',
            message: error.message
        });
    }
};

const addUser = async (req, res) => {
    try {
        const { id, first_name, last_name, birthday } = req.body;

        if (!id || !first_name || !last_name || !birthday) {
            return res.status(400).json({
                id: 'missing_fields',
                message: 'id, first_name, last_name, and birthday are required'
            });
        }

        const existingUser = await User.findOne({ id });

        if (existingUser) {
            return res.status(400).json({
                id: 'user_already_exists',
                message: 'User already exists'
            });
        }

        const user = await User.create({
            id,
            first_name,
            last_name,
            birthday
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({
            id: 'add_user_error',
            message: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const user = await User.findOne({ id });

        if (!user) {
            return res.status(404).json({
                id: 'user_not_found',
                message: 'User not found'
            });
        }

        const costs = await Cost.find({ userid: id });

        const total = costs.reduce((sum, cost) => {
            return sum + cost.sum;
        }, 0);

        res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            id: user.id,
            total
        });
    } catch (error) {
        res.status(500).json({
            id: 'get_user_error',
            message: error.message
        });
    }
};

module.exports = {
    getUsers,
    addUser,
    getUserById

};
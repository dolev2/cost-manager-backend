const User = require('../models/userModel');
const Cost = require('../models/CostModel');

/*
 * Retrieves all users from the database.
 */
const getUsers = async (req, res) => {
    try {
        // Fetch all users from the users collection
        const users = await User.find({});

        // Return users as JSON response
        res.json(users);
    } catch (error) {
        // Return server error response
        res.status(500).json({
            id: 'get_users_error',
            message: error.message
        });
    }
};

/*
 * Adds a new user to the database.
 */
const addUser = async (req, res) => {
    try {
        // Extract user data from request body
        const { id, first_name, last_name, birthday } = req.body;

        // Validate required fields
        if (!id || !first_name || !last_name || !birthday) {
            return res.status(400).json({
                id: 'missing_fields',
                message: 'id, first_name, last_name, and birthday are required'
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ id });

        // Return error if user already exists
        if (existingUser) {
            return res.status(400).json({
                id: 'user_already_exists',
                message: 'User already exists'
            });
        }

        // Create a new user document
        const user = await User.create({
            id,
            first_name,
            last_name,
            birthday
        });

        // Return the created user
        res.status(201).json(user);
    } catch (error) {
        // Return server error response
        res.status(500).json({
            id: 'add_user_error',
            message: error.message
        });
    }
};

/*
 * Retrieves a specific user and calculates
 * the total amount of all costs associated with that user.
 */
const getUserById = async (req, res) => {
    try {
        // Extract user id from URL parameters
        const id = Number(req.params.id);

        // Search for the user in the database
        const user = await User.findOne({ id });

        // Return error if user is not found
        if (!user) {
            return res.status(404).json({
                id: 'user_not_found',
                message: 'User not found'
            });
        }

        // Retrieve all costs belonging to the user
        const costs = await Cost.find({ userid: id });

        // Calculate total cost amount
        const total = costs.reduce((sum, cost) => {
            return sum + cost.sum;
        }, 0);

        // Return user details and total costs
        res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            id: user.id,
            total
        });
    } catch (error) {
        // Return server error response
        res.status(500).json({
            id: 'get_user_error',
            message: error.message
        });
    }
};

// Export controller functions
module.exports = {
    getUsers,
    addUser,
    getUserById

};
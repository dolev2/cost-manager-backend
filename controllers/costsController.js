const Cost = require('../models/CostModel');
const User = require('../models/userModel');
const Report = require('../models/reportModel');

/*
 * Adds a new cost item to the database.
 */
const addCost = async (req, res) => {
    try {
        // Extract cost information from request body
        const { userid, description, category, sum } = req.body;

        // Validate required fields
        if (!userid || !description || !category || !sum) {
            return res.status(400).json({
                id: 'missing_fields',
                message: 'userid, description, category, and sum are required'
            });
        }

        // Define allowed cost categories
        const allowedCategories = ['food', 'health', 'housing', 'sports', 'education'];

        // Validate category value
        if (!allowedCategories.includes(category)) {
            return res.status(400).json({
                id: 'invalid_category',
                message: 'Invalid category'
            });
        }

        // Verify that the user exists
        const user = await User.findOne({ id: userid });

        // Return error if user does not exist
        if (!user) {
            return res.status(404).json({
                id: 'user_not_found',
                message: 'User does not exist'
            });
        }

        // Create new cost document
        const cost = await Cost.create({
            userid,
            description,
            category,
            sum
        });

        // Return created cost item
        res.status(201).json(cost);
    } catch (error) {
        // Return server error response
        res.status(500).json({
            id: 'add_cost_error',
            message: error.message
        });
    }
};

/*
 * Generates a monthly report for a specific user.
 *
 * Computed Design Pattern:
 * Reports for past months are calculated once and saved
 * in the reports collection. Future requests for the same
 * report return the saved document instead of recalculating it.
 */
const getReport = async (req, res) => {
    try {
        // Extract query parameters
        const userid = Number(req.query.id);
        const year = Number(req.query.year);
        const month = Number(req.query.month);

        // Check if a saved report already exists
        const existingReport = await Report.findOne({
            userid,
            year,
            month
        });

        // Return saved report if found
        if (existingReport) {
            return res.json(existingReport);
        }

        // Validate required parameters
        if (!userid || !year || !month) {
            return res.status(400).json({
                id: 'missing_parameters',
                message: 'id, year and month are required'
            });
        }

        // Define the date range for the requested month
        const startDate = new Date(year, month - 1, 1);

        const endDate = new Date(year, month, 1);

        // Retrieve all costs for the user within the requested month
        const costs = await Cost.find({
            userid,
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        });

        // Initialize report structure
        const report = {
            userid,
            year,
            month,
            costs: [
                { food: [] },
                { health: [] },
                { housing: [] },
                { sports: [] },
                { education: [] }
            ]
        };

        // Group cost items by category
        costs.forEach((cost) => {
            const item = {
                sum: cost.sum,
                description: cost.description,
                day: new Date(cost.createdAt).getDate()
            };

            // Find matching category in the report
            const categoryObject = report.costs.find((c) =>
                c[cost.category] !== undefined
            );

            // Add cost item to the appropriate category
            if (categoryObject) {
                categoryObject[cost.category].push(item);
            }
        });

        // Get current date for Computed Pattern logic
        const now = new Date();

        // Check if the requested month belongs to the past
        const reportMonthAlreadyPassed =
            year < now.getFullYear() ||
            (year === now.getFullYear() && month < now.getMonth() + 1);

        // Save report for future requests if month already passed
        if (reportMonthAlreadyPassed) {
            await Report.create(report);
        }

        // Return generated report
        res.json(report);
    } catch (error) {
        // Return server error response
        res.status(500).json({
            id: 'report_error',
            message: error.message
        });
    }
};

// Export controller functions
module.exports = {
    addCost,
    getReport
};
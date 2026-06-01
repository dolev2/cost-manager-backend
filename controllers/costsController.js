const Cost = require('../models/CostModel');
const User = require('../models/userModel');
const Report = require('../models/reportModel');

const addCost = async (req, res) => {
    try {
        const { userid, description, category, sum } = req.body;

        if (!userid || !description || !category || !sum) {
            return res.status(400).json({
                id: 'missing_fields',
                message: 'userid, description, category, and sum are required'
            });
        }

        const allowedCategories = ['food', 'health', 'housing', 'sports', 'education'];

        if (!allowedCategories.includes(category)) {
            return res.status(400).json({
                id: 'invalid_category',
                message: 'Invalid category'
            });
        }

        const user = await User.findOne({ id: userid });

        if (!user) {
            return res.status(404).json({
                id: 'user_not_found',
                message: 'User does not exist'
            });
        }

        const cost = await Cost.create({
            userid,
            description,
            category,
            sum
        });

        res.status(201).json(cost);
    } catch (error) {
        res.status(500).json({
            id: 'add_cost_error',
            message: error.message
        });
    }
};

const getReport = async (req, res) => {
    try {
        const userid = Number(req.query.id);
        const year = Number(req.query.year);
        const month = Number(req.query.month);

        const existingReport = await Report.findOne({
            userid,
            year,
            month
        });

        if (existingReport) {
            return res.json(existingReport);
        }

        if (!userid || !year || !month) {
            return res.status(400).json({
                id: 'missing_parameters',
                message: 'id, year and month are required'
            });
        }

        const startDate = new Date(year, month - 1, 1);

        const endDate = new Date(year, month, 1);

        const costs = await Cost.find({
            userid,
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        });

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

        costs.forEach((cost) => {
            const item = {
                sum: cost.sum,
                description: cost.description,
                day: new Date(cost.createdAt).getDate()
            };

            const categoryObject = report.costs.find((c) =>
                c[cost.category] !== undefined
            );

            if (categoryObject) {
                categoryObject[cost.category].push(item);
            }
        });
        const now = new Date();

        const reportMonthAlreadyPassed =
            year < now.getFullYear() ||
            (year === now.getFullYear() && month < now.getMonth() + 1);

        if (reportMonthAlreadyPassed) {
            await Report.create(report);
        }

        res.json(report);
    } catch (error) {
        res.status(500).json({
            id: 'report_error',
            message: error.message
        });
    }
};

module.exports = {
    addCost,
    getReport
};
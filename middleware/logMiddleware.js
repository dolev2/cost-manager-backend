const pino = require('pino');

const Log = require('../models/logModel');

const logger = pino();

const logRequest = async (req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);

    await Log.create({
        method: req.method,
        url: req.originalUrl,
        message: 'HTTP request received'
    });

    next();
};

module.exports = logRequest;
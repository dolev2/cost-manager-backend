const pino = require('pino');

const Log = require('../models/logModel');

// Create Pino logger instance
const logger = pino();

/*
 * Middleware that logs every incoming HTTP request.
 */
const logRequest = async (req, res, next) => {
    // Write request information to the application log
    logger.info(`${req.method} ${req.originalUrl}`);

    // Save request details in the logs collection
    await Log.create({
        method: req.method,
        url: req.originalUrl,
        message: 'HTTP request received'
    });

    // Continue to the next middleware or route handler
    next();
};

// Export middleware function
module.exports = logRequest;
const { getConfig } = require('../../config');
const { logger } = require('../providers');
const { ApiError } = require('../http');

/**
 * Handles error thrown via the middleware
 * 
 * @param {Error} error error thrown by the middleware
 * @param {Object} request express request
 * @param {Object} response express response
 * @param {Function} next next express middleware
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (error, request, response, next) => {
    if (error instanceof ApiError) {
        return response.status(error.httpStatusCode).json(error.response());
    }
    logger.error(error);
    response.status(500).json({
        code: 2,
        message: (getConfig('env') === 'production') ? 'something went wrong':  error.message,
    });
};
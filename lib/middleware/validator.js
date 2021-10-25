const { ApiError } = require('../http');

/**
 * Middleware for validating the request
 *
 * @param {Object} schema joi schema
 * @param {String} requestPath request property name to validate
 * @returns {Function} express middleware
 */
module.exports = (schema, requestPath) => {
    return (request, response, next) => {
        const { error } = schema.validate(request[requestPath]);
        if (error) {
            next(new ApiError(error.message, 2, 400));
            return false;
        }
        next();
    };
};
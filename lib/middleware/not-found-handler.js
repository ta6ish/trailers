const { apiResponse } = require('../http');

/**
 * Responds with not found
 *
 * @param {Object} request express request
 * @param {Object} response express response
 * @param {Function} next next express middleware
 * @returns {void}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (request, response, next) => {
    response.status(404).json(apiResponse({ message: 'not found' }, 2));
};

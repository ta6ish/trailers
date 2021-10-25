/**
 * Wrapper for executing middleware which return promise
 * handles error thrown by promises
 * 
 * @param {*} asyncRouteHandler 
 * @returns {Function} express middleware
 */
module.exports = (asyncRouteHandler) => {
    return (request, response, next) => {
        return asyncRouteHandler(request, response, next).catch(next);
    };
};
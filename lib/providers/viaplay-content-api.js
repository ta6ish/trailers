const HttpProvider = require('./http');

module.exports = class ViaPlayContentApi extends HttpProvider {
    /**
     * ViaPlay Content API for specific device
     * @param {string} device Device ID
     */
    constructor(device) {
        super(`https://content.viaplay.se/${device}/`);
    }

    /**
     * Retrieve film data.
     * @param {String} filmSlug
     * @returns {Object}
     */
    film(filmSlug) {
        return this.request({
            url: `/film/${filmSlug}`,
            method: 'GET',
        });
    }
};

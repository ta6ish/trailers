const HttpProvider = require('./http');
const { getConfig } = require('../../config');

module.exports = class TMDBApi extends HttpProvider {
    constructor() {
        super('https://api.themoviedb.org/3/');
    }

    /**
     * Retrieve movie videos.
     * @param {String} imdbId
     * @returns {Array}
     */
    async videos(imdbId) {
        const { results } = await this.#apiRequest({
            url: `/movie/${imdbId}/videos`,
            method: 'GET',
        });
        return results;
    }

    /**
     * Execute TMDB API request.
     * @param {String} url API endpoint
     * @param {String} method Http Method
     * @param {Object} data
     * @param {Object} params
     * @param {Object} headers
     * @returns
     */
    async #apiRequest({ url, method, data = {}, params = {}, headers = {} }) {
        return this.request({
            url,
            method,
            data,
            params: { ...params, api_key: getConfig('tmdbApiKey') },
            headers,
        });
    }
};

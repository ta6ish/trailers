const _ = require('lodash');
const BaseTrailer = require('./base-trailer');
const { TMDBApi } = require('../providers');
const { ApiError } = require('../http');

module.exports = class TMDBTrailers extends BaseTrailer {
    /**
     * Get Trailer link from TMDB API.
     * @param {String} imdbId
     * @returns {String}
     */
    async getTrailer(imdbId) {
        const api = new TMDBApi();
        const videos = await api.videos(imdbId);
        const trailer = _.find(
            videos,
            ({ type, official }) => type === 'Trailer' && official
        );
        if (!trailer) {
            throw new ApiError('Failed to get trailer from service');
        }
        return this.#formTrailerLink(trailer);
    }

    /**
     * Forms a link trailer from specific website.
     * @param {Object} trailer The TMDB trailer object
     * @returns {String}
     */
    #formTrailerLink(trailer) {
        const { site, key } = trailer;
        const sites = {
            youtube: (urlPart) => `https://www.youtube.com/watch?v=${urlPart}`,
        };
        return sites[site.toLowerCase()](key);
    }
};

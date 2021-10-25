const { TMDBTrailers } = require('../services');
const services = {
    tmdb: TMDBTrailers,
};

/**
 * Get movie trailer from provided service
 * @param {*} serviceKey
 * @param {*} imdbId
 * @returns
 */
module.exports = (serviceKey, imdbId) => {
    const service = new services[serviceKey]();
    return service.getTrailer(imdbId);
};

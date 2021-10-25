const _ = require('lodash');
const { getConfig } = require('../../../config');
const { apiResponse } = require('../../http');
const { getTrailerUrl } = require('../../helpers');
const { ViaPlayContentApi, logger } = require('../../providers');
const { ApiError } = require('../../http');
const { viaPlayFilmRegex } = require('./validations');

const getTrailer = async (request, response) => {
    try {
        const { url } = request.query;
        const [, deviceId, filmSlug] = url.match(viaPlayFilmRegex);
        const viaPlayApi = new ViaPlayContentApi(deviceId);
        const film = await viaPlayApi.film(filmSlug);
        const imdbId = _.get(
            film,
            '_embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb.id'
        );
        if (!imdbId) {
            throw new ApiError('IMDB ID was not found', 2, 404);
        }
        const trailerServiceKey = getConfig('trailerService');
        const trailerUrl = await getTrailerUrl(trailerServiceKey, imdbId);
        const type = 'trailer';
        response.status(200).json(apiResponse({ url: trailerUrl, type }));
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        logger.error(error);
        throw new ApiError('Trailer not found', 2, 404);
    }
};

module.exports = {
    getTrailer,
};

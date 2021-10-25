const _ = require('lodash');
const { getConfig } = require('../../../config');
const { apiResponse } = require('../../http');
const { getTrailerUrl } = require('../../helpers');
const { ViaPlayContentApi } = require('../../providers');
const { ApiError } = require('../../http');
const { viaPlayFilmRegex } = require('./validations');

const getTrailer = async (request, response) => {
    const { url } = request.query;
    const [, deviceId, filmSlug] = url.match(viaPlayFilmRegex);
    const viaPlayApi = new ViaPlayContentApi(deviceId);
    const film = await viaPlayApi.film(filmSlug);
    const imdbId = _.get(
        film,
        '_embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb.id'
    );
    if (!imdbId) {
        throw new ApiError('IMDB ID was not found');
    }
    const trailerServiceKey = getConfig('trailerService');
    const trailerUrl = await getTrailerUrl(trailerServiceKey, imdbId);
    const type = 'trailer';
    response.status(200).json(apiResponse({ trailerUrl, type }));
};

module.exports = {
    getTrailer,
};

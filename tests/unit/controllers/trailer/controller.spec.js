const _ = require('lodash');
const {
    getTrailer,
} = require('../../../../lib/controllers/trailer/controller');
const { ViaPlayContentApi } = require('../../../../lib/providers');
const { getTrailerUrl } = require('../../../../lib/helpers');

jest.mock('../../../../lib/helpers');

describe('Trailer Controller', () => {
    let film;
    beforeEach(() => {
        film = jest.spyOn(ViaPlayContentApi.prototype, 'film');
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('Throws APIError IMDB ID was not found', async () => {
        const videos = [];
        film.mockResolvedValueOnce(videos);
        const filmSlug = 'arrival-2016';
        const request = {
            query: {
                url: `https://content.viaplay.se/pc-se/film/${filmSlug}`,
            },
        };
        const errorSpy = jest.fn();
        await getTrailer(request, {}).catch(errorSpy);
        expect(film).toHaveBeenCalledTimes(1);
        expect(film).toHaveBeenCalledWith(filmSlug);
        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy.mock.calls[0][0].message).toBe('IMDB ID was not found');
    });

    it('Gets trailer url', async () => {
        const imdbId = 'test';
        const filResponse = _.set(
            {},
            '_embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb.id',
            imdbId
        );
        film.mockResolvedValueOnce(filResponse);
        const trailerUrl = 'https://sometrailer.com';
        getTrailerUrl.mockResolvedValueOnce(trailerUrl);
        const filmSlug = 'arrival-2016';
        const request = {
            query: {
                url: `https://content.viaplay.se/pc-se/film/${filmSlug}`,
            },
        };
        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await getTrailer(request, response);
        expect(film).toHaveBeenCalledTimes(1);
        expect(film).toHaveBeenCalledWith(filmSlug);
        expect(getTrailerUrl.mock.calls[0][1]).toBe(imdbId);
        expect(response.json).toHaveBeenCalledTimes(1);
    });
});

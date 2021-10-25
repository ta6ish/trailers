const { TMDBApi } = require('../../../lib/providers');
const { TMDBTrailers } = require('../../../lib/services');
const videosMockData = require('../../data/tmdb-videos');

describe('TMDBTrailers', () => {
    let videos;
    const imdbId = 'test';
    let tmdbTrailers = new TMDBTrailers();
    beforeEach(() => {
        videos = jest.spyOn(TMDBApi.prototype, 'videos');
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Throws APIError Failed to get trailer from service', async () => {
        videos.mockResolvedValueOnce([]);
        const errorSpy = jest.fn();
        await tmdbTrailers.getTrailer(imdbId).catch(errorSpy);
        expect(videos).toHaveBeenCalledTimes(1);
        expect(videos).toHaveBeenCalledWith(imdbId);
        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy.mock.calls[0][0].message).toBe(
            'Failed to get trailer from service'
        );
    });

    it('Retrieves trailer link from API', async () => {
        videos.mockResolvedValueOnce(videosMockData);
        const officalTrailerVideo = videosMockData[1];
        const url = await tmdbTrailers.getTrailer(imdbId);
        expect(url).toBe(
            `https://www.youtube.com/watch?v=${officalTrailerVideo.key}`
        );
        expect(videos).toHaveBeenCalledTimes(1);
        expect(videos).toHaveBeenCalledWith(imdbId);
    });
});

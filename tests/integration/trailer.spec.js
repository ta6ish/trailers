const supertest = require('supertest');
const _ = require('lodash');
const nock = require('nock');
const app = require('../../app');
const { getConfig } = require('../../config');
const tmdbVideos = require('../data/tmdb-videos');

const baseUrl = '/api/trailer';

describe(`Trailer controller`, () => {
    let api;
    const imdbId = 'test';
    const filResponse = _.set(
        {},
        '_embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb.id',
        imdbId
    );
    beforeAll(async () => {
        api = supertest(app);
    });

    beforeEach(() => {
        nock('https://content.viaplay.se')
            .get('/pc-se/film/arrival-2016')
            .reply(200, filResponse);
    });

    describe('GET /api/trailer', () => {
        it('[400] Requires url', async () => {
            const { body } = await api.get(baseUrl).expect(400);
            const { code, message } = body;
            expect(code).toBe(2);
            expect(message).toBe('"url" is required');
        });

        it('[400] Validates url', async () => {
            const { body } = await api
                .get(baseUrl)
                .query({
                    url: 'https://someinvalidurl.com/unknown/film/2334',
                })
                .expect(400);
            const { code, message } = body;
            expect(code).toBe(2);
            expect(message).toBe(
                'URL Must have to be valid viaplay content film uri'
            );
        });

        it('[500] Trailer not found from API', async () => {
            nock('https://api.themoviedb.org')
                .get(`/3/movie/${imdbId}/videos`)
                .query({ api_key: getConfig('tmdbApiKey') })
                .reply(200, { results: [] });

            const { body } = await api
                .get(baseUrl)
                .query({
                    url: 'https://content.viaplay.se/pc-se/film/arrival-2016',
                })
                .expect(500);
            const { code, message } = body;
            expect(code).toBe(2);
            expect(message).toBe('Failed to get trailer from service');
        });

        it('[200] Gets trailer url', async () => {
            nock('https://api.themoviedb.org')
                .get(`/3/movie/${imdbId}/videos`)
                .query({ api_key: getConfig('tmdbApiKey') })
                .reply(200, { results: tmdbVideos });

            const { body } = await api
                .get(baseUrl)
                .query({
                    url: 'https://content.viaplay.se/pc-se/film/arrival-2016',
                })
                .expect(200);
            const { code, data } = body;
            expect(code).toBe(1);
            expect(data).toHaveProperty('trailerUrl');
        });
    });
});

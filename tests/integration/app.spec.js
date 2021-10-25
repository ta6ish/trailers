const supertest = require('supertest');
const app = require('../../app');

const baseUrl = '/api/unknown';

describe(`Test app and middleware`, () => {
    it('should get 404', async () => {
        const { body } = await supertest(app).get(baseUrl).expect(404);
        expect(body.data.message).toEqual('not found');
    });
});

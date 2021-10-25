const { apiResponse } = require('../../../lib/http');

describe('Test apiResponse', () => {
    it('Provides response with data parameter', async () => {
        const data = { result: true };
        const response = apiResponse(data);
        expect(response.code).toBe(1);
        expect(response).toHaveProperty('data.result');
    });
    it('Provides response with all parameters', async () => {
        const data = { result: true };
        const code = 3;
        const response = apiResponse(data, code);
        expect(response.code).toBe(code);
        expect(response).toHaveProperty('data.result');
    });
});

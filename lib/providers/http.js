const axios = require('axios');

module.exports = class HttpProvider {
    
    /**
     * The http client for executing HTTP calls.
     * @param {axios}
     */
    #httpClient

    /**
     * Setup http client with baseUrl.
     * @param {String} baseUrl
     * @param {Object} options
     * @param {Object} options.timeout Http Request timeout
     */
    constructor(baseUrl, { timeout = 4000 } = {}) {
        this.baseUrl = baseUrl;
        this.#httpClient = axios.create({
            baseURL: baseUrl,
            timeout,
        });
    }

    /**
     * Execute http request.
     * @param {String} url
     * @param {String} method Http Method
     * @param {Object} data
     * @param {Object} params
     * @param {Object} headers
     * @returns
     */
    async request({ url, method, data = {}, params = {}, headers = {} }) {
        const options = {
            url,
            method,
            data,
            params,
            headers,
        };
        if (method === 'GET') {
            delete options.data;
        }
        const result = await this.#httpClient(options);
        return result.data;
    }
};

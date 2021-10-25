require('dotenv').config();

const appConfig = {
    env: process.env.NODE_ENV,
    tmdbApiKey: process.env.TMDB_API_KEY,
    trailerService: "tmdb",
    port: process.env.PORT || 3000,
};

/**
 * Gets app config
 * 
 * @param {String} config config name
 * @returns {Mixed}
 */
const getConfig = (config) => {
    return appConfig[config];
}

module.exports = {
    getConfig,
};

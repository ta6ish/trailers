
/**
 * Abstract class for implmenting service
 * responsible for getting trailer
 */
module.exports = class BaseTrailer {

    /**
     * Abstract method for getting trailer.
     * @param {string} imdbId 
     */
    // eslint-disable-next-line no-unused-vars
    getTrailer(imdbId) {
        throw new Error('Implement method');
    }

}
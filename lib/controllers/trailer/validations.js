const joi = require('joi');
const viaPlayFilmRegex = /^https:\/\/content.viaplay.se\/([\w-_]+)\/film\/([\w-_]+)$/;

const getTrailerValidation = joi
    .object({
        url: joi.string().uri().required(),
    })
    .custom((value, helpers) => {
        const { url } = value;
        if (!viaPlayFilmRegex.test(url)) {
            return helpers.message(
                'URL Must have to be valid viaplay content film uri'
            );
        }
        return value;
    });

module.exports = { getTrailerValidation, viaPlayFilmRegex };

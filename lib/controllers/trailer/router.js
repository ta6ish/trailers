const express = require('express');

const { getTrailer } = require('./controller');
const { getTrailerValidation } = require('./validations');
const { asyncWrapper, validator } = require('../../middleware');
const trailerRouter = express.Router();

trailerRouter.get('/', [
    validator(getTrailerValidation, 'query'),
    asyncWrapper(getTrailer),
]);

module.exports = trailerRouter;
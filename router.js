const epxress = require('express');
const trailerRouter = require('./lib/controllers/trailer/router');

const appRouter = new epxress.Router();
appRouter.use('/trailer', trailerRouter);

module.exports = appRouter;

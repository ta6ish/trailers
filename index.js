const app = require('./app');
const { getConfig } = require('./config');
const { logger } = require('./lib/providers');

const server = app.listen(getConfig('port'), () => {
    const { address, port } = server.address();
    logger.debug(`Running at ${address}:${port}`);
});

process.on('unhandledRejection', (reason) => {
    logger.error(reason);
});

process.on('uncaughtException', (error) => {
    logger.error(error);
});

module.exports = server;
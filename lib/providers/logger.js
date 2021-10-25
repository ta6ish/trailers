const winston = require('winston');
const { format } = require('logform');

const { getConfig } = require('../../config');

const options = {
    format: format.combine(
        format.errors({ stack: true }),
        format.json()
    ),
    transports: [
        new winston.transports.Console({
            level: getConfig('env') === 'production' ? 'info' : 'debug',
        }),
    ],
};

module.exports = winston.createLogger(options);
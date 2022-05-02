
const winston = require('winston');
const mongo = require('winston-mongodb');

const logConfiguration = {
    transports: [
        new winston.transports.Console({
            level: 'info'
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'log/logs.log'
        }),
        new winston.transports.File({
            level: 'info',
            filename: 'log/logs.log'
        }),
        new winston.transports.MongoDB({
            level: 'error',
            db: 'mongodb://srv1:27017/324103183-sulamitCohen&tamarOstry',
            options: {
                useUnifiedTopology: true
            },
            collection: 'logs'
        })
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss.SSS'
        }),
        winston.format.printf(info => `${info.level}:${info.timestamp}:${info.message}`),
    )
}

const logger = winston.createLogger(logConfiguration);
module.exports = logger;
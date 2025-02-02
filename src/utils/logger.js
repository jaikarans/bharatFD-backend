import {createLogger, format, transports } from 'winston';
import { NODE_ENV } from '../config/config.js';

export const logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: {service: 'server', environment: `${NODE_ENV}`},
    transports: [
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/debug.log', level: 'debug' }),
        new transports.File({ filename: './logs/combine.log' }),
    ]

});


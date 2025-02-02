import {createLogger, format, transports} from 'winston';
import { NODE_ENV } from '../config/config.js';

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: () => {
                const date = new Date();
                return new Intl.DateTimeFormat('en-IN', {
                  timeZone: 'Asia/Kolkata',  // UTC+5:30 (India Standard Time)
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                }).format(date);
              }
        
        }),
        format.json(),
    ),
    defaultMeta: {service: 'server', environment: `${NODE_ENV}`},
    transports: [
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/debug.log', level: 'debug' }),
        new transports.File({ filename: './logs/combine.log' }),
    ]

});


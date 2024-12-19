import winston from 'winston';

import { config } from '../../config';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};

const { nodeEnv } = config;

const level = () => {
    const isDevelopment = nodeEnv === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.json(),
);

const transports = [new winston.transports.Console()];

const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
});

export default Logger;

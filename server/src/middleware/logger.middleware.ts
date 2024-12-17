import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';
import { NextFunction, Request, Response } from 'express';

import { LOGGER_DIR_NAME, LOGGER_FILE_NAME } from '../constants';

const logEvents = async (message: string, logFileName: string) => {
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', LOGGER_DIR_NAME))) {
            await fsPromises.mkdir(path.join(__dirname, '..', LOGGER_DIR_NAME));
        }
        await fsPromises.appendFile(
            path.join(__dirname, '..', LOGGER_DIR_NAME, logFileName),
            logItem,
        );
    } catch (error) {
        console.log(error);
    }
};

const logger = (req: Request, _: Response, next: NextFunction) => {
    logEvents(
        `${req.method}\t${req.url}\t${req.headers.origin}`,
        LOGGER_FILE_NAME,
    );
    console.log(`${req.method} ${req.path}`);
    next();
};

export { logEvents, logger };

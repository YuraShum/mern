import { Request, Response } from 'express';

import { logEvents } from './logger.middleware';
import { LOGGER_ERROR_FILE_NAME } from '../constants';

const errorHandler = (err: Error, req: Request, res: Response) => {
    logEvents(
        `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
        LOGGER_ERROR_FILE_NAME,
    );
    console.log('error');
    console.log(err.stack);

    const status = res.statusCode ? res.statusCode : 500;

    res.status(status);
    res.json({ message: err.message });
};
export { errorHandler };

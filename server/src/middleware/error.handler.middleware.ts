import { NextFunction, Request, Response } from 'express';
import { ApiError, ErrorHandler } from '../errors';
import Logger from '../libs/winston/logger';
import { logEvents } from './logger.middleware';
import { LOGGER_ERROR_FILE_NAME, INTERNAL_SERVER_ERROR } from '../constants';

const errorHandler = new ErrorHandler(Logger);

export async function errorMiddleware(
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!errorHandler.isTrustedError(err)) {
        next(err);
        return;
    }

    await errorHandler.handleError(err);

    logEvents(
        `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
        LOGGER_ERROR_FILE_NAME
    );

    const status = err.httpCode || 500;
    res.status(status).json({
        message: err.message || INTERNAL_SERVER_ERROR,
    });
}
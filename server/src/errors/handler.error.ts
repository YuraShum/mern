import winston from 'winston';

import { ApiError } from './api.error';
import { INTERNAL_SERVER_ERROR } from '../constants';

export class ErrorHandler {
    private logger: winston.Logger;

    constructor(logger: winston.Logger) {
        this.logger = logger;
    }

    public async handleError(err: Error): Promise<void> {
        if (this.isTrustedError(err)) {
            const apiError = err as ApiError;

            this.logger.error({
                message: apiError.message,
                stack: apiError.stack,
                log: apiError.log,
                methodName: apiError.methodName,
                httpCode: apiError.httpCode,
            });
        } else {
            this.logger.error({
                message: INTERNAL_SERVER_ERROR,
                originalError: err.message,
                stack: err.stack,
            });
        }
    }

    public isTrustedError(error: Error): boolean {
        return error instanceof ApiError && error.isOperational;
    }
}
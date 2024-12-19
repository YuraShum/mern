import status from 'http-status';

import { ApiError } from '../errors';
import { config } from './config';
import { CORS_METHOD, CORS_NOT_ALLOWED } from '../constants';

const { host } = config;

const allowedOrigins: string[] = [host];
const corsOptions = {
    origin: (
        origin: string | undefined,
        callback: (err: Error | null, allow: boolean) => void,
    ) => {
        if (allowedOrigins.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true);
        } else {
            const error = new ApiError(
                CORS_NOT_ALLOWED,
                CORS_NOT_ALLOWED,
                CORS_METHOD,
                status.FORBIDDEN,
                true,
            );
            callback(error, false);
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
export { corsOptions };

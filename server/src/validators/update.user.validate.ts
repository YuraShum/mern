import { body } from 'express-validator';
import status from 'http-status';

import {
    PASSWORD_MIN_LENGTH,
    PASSWORD_MUST_BE_STRING,
    ROLES_ARRAY_CANNOT_BE_EMPTY,
    ROLES_MUST_BE_ARRAY,
    ROLES_REQUIRED,
    UPDATE_USER_VALIDATE,
    USER_ID_LENGTH_MESSAGE,
    USER_ID_MUST_BE_STRING,
} from '../constants';
import { isRequiredBoolean, isRequiredString } from './base.config.validate';
import { ApiError } from '../errors';

export const validateUpdateUserBody = [
    body('userId')
        .isString()
        .withMessage(USER_ID_MUST_BE_STRING)
        .isLength({ min: 24, max: 24 })
        .withMessage(USER_ID_LENGTH_MESSAGE),
    isRequiredString('username'),
    body('roles')
        .isArray()
        .withMessage(ROLES_MUST_BE_ARRAY)
        .notEmpty()
        .withMessage(ROLES_REQUIRED)
        .custom(roles => {
            if (roles.length < 1) {
                throw new ApiError(
                    ROLES_ARRAY_CANNOT_BE_EMPTY,
                    ROLES_ARRAY_CANNOT_BE_EMPTY,
                    UPDATE_USER_VALIDATE,
                    status.BAD_REQUEST,
                );
            }
            return true;
        }),
    isRequiredBoolean('active'),
    body('password')
        .optional()
        .isString()
        .withMessage(PASSWORD_MUST_BE_STRING)
        .isLength({ min: 8 })
        .withMessage(PASSWORD_MIN_LENGTH),
];

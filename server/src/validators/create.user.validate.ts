import { body } from 'express-validator';
import status from 'http-status';

import { ApiError } from '../errors';
import { isPassword, isRequiredString } from './base.config.validate';
import {
    CREATE_USER_VALIDATE,
    ROLES_ARRAY_CANNOT_BE_EMPTY,
    ROLES_MUST_BE_ARRAY,
    ROLES_REQUIRED,
} from '../constants';

export const validateCreateUserBody = [
    isRequiredString('username'),
    isPassword('password'),
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
                    CREATE_USER_VALIDATE,
                    status.BAD_REQUEST,
                );
            }
            return true;
        }),
];

import { body } from 'express-validator';

import {
    IS_REQUIRED,
    MUST_BE_A_BOOLEAN,
    MUST_BE_A_STRING,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MUST_BE_STRING,
} from '../constants';

export const isRequiredString = (field: string) =>
    body(field)
        .isString()
        .withMessage(`${field} ${MUST_BE_A_STRING}`)
        .notEmpty()
        .withMessage(`${field} ${IS_REQUIRED}`);

export const isRequiredBoolean = (field: string) =>
    body(field)
        .isBoolean()
        .withMessage(`${field} ${MUST_BE_A_BOOLEAN}`)
        .notEmpty()
        .withMessage(`${field} ${IS_REQUIRED}`);

export const isPassword = (field: string) =>
    body(field)
        .isString()
        .withMessage(PASSWORD_MUST_BE_STRING)
        .isLength({ min: 8 })
        .withMessage(PASSWORD_MIN_LENGTH);

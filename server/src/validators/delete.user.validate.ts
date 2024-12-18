import { body } from "express-validator";
import { USER_ID_LENGTH_MESSAGE, USER_ID_MUST_BE_STRING } from "../constants";

export const validateDeleteUserBody = [
    body('userId')
        .isString()
        .withMessage(USER_ID_MUST_BE_STRING)
        .isLength({ min: 24, max: 24 })
        .withMessage(USER_ID_LENGTH_MESSAGE),
]
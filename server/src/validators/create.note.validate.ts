import { body } from "express-validator";
import { USER_ID_LENGTH_MESSAGE, USER_ID_MUST_BE_STRING } from "../constants";
import { isRequiredString } from "./base.config.validate";

export const validateCreateNoteBody = [
    body('user')
        .isString()
        .withMessage(USER_ID_MUST_BE_STRING)
        .isLength({ min: 24, max: 24 })
        .withMessage(USER_ID_LENGTH_MESSAGE),
    isRequiredString('title'),
    isRequiredString('text')
]
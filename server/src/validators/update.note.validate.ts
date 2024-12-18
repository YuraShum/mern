import { body } from "express-validator";
import { NOTE_ID_LENGTH_MESSAGE, NOTE_ID_MUST_BE_STRING, USER_ID_LENGTH_MESSAGE, USER_ID_MUST_BE_STRING } from "../constants";
import { isRequiredBoolean, isRequiredString } from "./base.config.validate";

export const validateUpdateNoteBody = [
    body('noteId')
        .isString()
        .withMessage(NOTE_ID_MUST_BE_STRING)
        .isLength({ min: 24, max: 24 })
        .withMessage(NOTE_ID_LENGTH_MESSAGE),
    body('user')
        .isString()
        .withMessage(USER_ID_MUST_BE_STRING)
        .isLength({ min: 24, max: 24 })
        .withMessage(USER_ID_LENGTH_MESSAGE),
    isRequiredString('title'),
    isRequiredString('text'),
    isRequiredBoolean('completed')

]
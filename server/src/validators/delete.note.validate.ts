import { body } from 'express-validator';

import { NOTE_ID_LENGTH_MESSAGE, NOTE_ID_MUST_BE_STRING } from '../constants';

export const validateDeleteNoteBody = [
    body('noteId')
        .isString()
        .withMessage(NOTE_ID_MUST_BE_STRING)
        .isLength({ min: 24, max: 24 })
        .withMessage(NOTE_ID_LENGTH_MESSAGE),
];

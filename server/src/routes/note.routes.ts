import express from 'express';

import { noteController } from '../controllers';
import {
    validateCreateNoteBody,
    validateDeleteNoteBody,
    validateUpdateNoteBody,
    validator,
} from '../validators';

const router = express.Router();

router.get('/', noteController.getAllNotes);

router.post(
    '/',
    ...validateCreateNoteBody,
    validator,
    noteController.createNewNote,
);

router.patch(
    '/',
    ...validateUpdateNoteBody,
    validator,
    noteController.updateNote,
);

router.delete(
    '/',
    ...validateDeleteNoteBody,
    validator,
    noteController.deleteNote,
);

export default router;

import express from 'express';

import { noteController } from '../controllers';

const router = express.Router();

router.get('/', noteController.getAllNotes);

router.post('/', noteController.createNewNote);

router.patch('/', noteController.updateNote);

router.delete('/', noteController.deleteNote);

export default router;

import express from 'express';
import path from 'path';

import userRoutes from './user.routes';
import noteRoutes from './note.routes';

const router = express.Router();

router.get('^/$|/index(.html)?', (_, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.use('/users', userRoutes);
router.use('/notes', noteRoutes);

export default router;

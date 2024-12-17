import express from 'express';

import { userController } from '../controllers';

const router = express.Router();

router.get('/', userController.getAllUsers);

router.post('/', userController.createNewUser);

router.patch('/', userController.updateUser);

router.delete('/', userController.deleteUser);

export default router;

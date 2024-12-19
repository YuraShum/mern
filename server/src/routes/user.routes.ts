import express from 'express';

import { userController } from '../controllers';
import {
    validateCreateUserBody,
    validateDeleteUserBody,
    validateUpdateUserBody,
    validator,
} from '../validators';

const router = express.Router();

router.get('/', userController.getAllUsers);

router.post(
    '/',
    ...validateCreateUserBody,
    validator,
    userController.createNewUser,
);

router.patch(
    '/',
    ...validateUpdateUserBody,
    validator,
    userController.updateUser,
);

router.delete(
    '/',
    ...validateDeleteUserBody,
    validator,
    userController.deleteUser,
);

export default router;

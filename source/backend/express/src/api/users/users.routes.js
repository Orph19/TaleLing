import { Router } from 'express';
import * as usersController from './users.controller.js';
import { authenticateInternal } from '../../middleware/authenticateInternal.js';

const usersRoutes = Router();

usersRoutes.post(
    '/provision',
    authenticateInternal,
    usersController.createUserDoc
);

usersRoutes.post(
    '/preferences',
    authenticateInternal,
    usersController.updateUserDoc
);

export default usersRoutes;
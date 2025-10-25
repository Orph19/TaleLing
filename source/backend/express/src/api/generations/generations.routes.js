
import { Router } from 'express';
import * as generationsController from './generations.controller.js';
import { authenticateInternal } from '../../middleware/authenticateInternal.js';

const generationsRoutes = Router();

generationsRoutes.post(
    '/update',
    authenticateInternal,
    generationsController.updateRequestStatus
);

// Will be used to /store generations of translations (To create Dictionary)



export default generationsRoutes;
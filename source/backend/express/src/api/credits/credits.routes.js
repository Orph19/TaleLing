
import { Router } from 'express';
import * as creditsController from './credits.controller.js';
import { authenticateInternal } from '../../middleware/authenticateInternal.js';

const creditsRoutes = Router();

creditsRoutes.post(
    '/reserve',
    authenticateInternal,
    creditsController.reserveCredits
);

creditsRoutes.post(
    '/refund',
    authenticateInternal,
    creditsController.refundCredits
);

// creditsRoutes.post(
//     '/cleanup',
//     authenticateInternal,
//     creditsController.cleanUp
// );



export default creditsRoutes;
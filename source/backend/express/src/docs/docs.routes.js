
import Router from 'express';
import * as docsController from './docs.controller.js';
import { authenticateInternal } from '../middleware/authenticateInternal.js';

const docRoutes = Router();

docRoutes.post(
	'/create',
	authenticateInternal,
	docsController.createDocHandler
);

docRoutes.post(
	'/update',
	authenticateInternal,
	docsController.updateDocHandler
);

export default docRoutes;

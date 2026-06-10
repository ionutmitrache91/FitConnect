import { Router } from 'express';
import { getDashboard } from '../controllers/dashboardController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, asyncHandler(getDashboard));

export default router;

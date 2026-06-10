import { Router } from 'express';
import { getProfile } from '../controllers/userController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/me', requireAuth, asyncHandler(getProfile));

export default router;

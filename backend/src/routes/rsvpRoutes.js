import { Router } from 'express';
import { cancel, join } from '../controllers/rsvpController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/join', requireAuth, asyncHandler(join));
router.post('/cancel', requireAuth, asyncHandler(cancel));

export default router;

import { Router } from 'express';
import { getNotifications, markNotificationsRead } from '../controllers/notificationController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, asyncHandler(getNotifications));
router.patch('/read-all', requireAuth, asyncHandler(markNotificationsRead));

export default router;

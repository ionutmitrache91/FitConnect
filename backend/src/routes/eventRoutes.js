import { Router } from 'express';
import { addEvent, editEvent, getEvent, getEvents, removeEvent } from '../controllers/eventController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', optionalAuth, asyncHandler(getEvents));
router.get('/:id', optionalAuth, asyncHandler(getEvent));
router.post('/', requireAuth, asyncHandler(addEvent));
router.put('/:id', requireAuth, asyncHandler(editEvent));
router.delete('/:id', requireAuth, asyncHandler(removeEvent));

export default router;

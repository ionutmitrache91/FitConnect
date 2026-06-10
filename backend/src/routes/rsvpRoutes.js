import { Router } from 'express';

const router = Router();

router.post('/join', (_req, res) => {
  res.status(501).json({ message: 'RSVP join is not implemented yet.' });
});

router.post('/cancel', (_req, res) => {
  res.status(501).json({ message: 'RSVP cancellation is not implemented yet.' });
});

export default router;


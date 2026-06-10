import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json([]);
});

router.get('/:id', (req, res) => {
  res.status(501).json({ message: `Event ${req.params.id} is not implemented yet.` });
});

router.post('/', (_req, res) => {
  res.status(501).json({ message: 'Event creation is not implemented yet.' });
});

router.put('/:id', (_req, res) => {
  res.status(501).json({ message: 'Event editing is not implemented yet.' });
});

router.delete('/:id', (_req, res) => {
  res.status(501).json({ message: 'Event deletion is not implemented yet.' });
});

export default router;


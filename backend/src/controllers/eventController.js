import {
  createEvent,
  deleteEventById,
  findEventById,
  listEvents,
  updateEventById
} from '../models/eventModel.js';
import { httpError } from '../utils/httpError.js';
import { normalizeImageUrl } from '../utils/eventImages.js';
import { validateEventPayload } from '../utils/validation.js';

function eventPayload(body) {
  return {
    title: body.title.trim(),
    description: body.description.trim(),
    date: body.date,
    time: body.time,
    location: body.location.trim(),
    category: body.category.trim(),
    image_url: normalizeImageUrl(body.image_url)
  };
}

export async function getEvents(req, res) {
  const events = await listEvents({ userId: req.user?.id });
  res.json({ events });
}

export async function getEvent(req, res) {
  const event = await findEventById(req.params.id, { userId: req.user?.id });

  if (!event) {
    throw httpError(404, 'Event not found.');
  }

  res.json({ event });
}

export async function addEvent(req, res) {
  const validationError = validateEventPayload(req.body);

  if (validationError) {
    throw httpError(400, validationError);
  }

  const event = await createEvent({
    ...eventPayload(req.body),
    creator_id: req.user.id
  });

  res.status(201).json({ event });
}

export async function editEvent(req, res) {
  const existingEvent = await findEventById(req.params.id, { userId: req.user.id });

  if (!existingEvent) {
    throw httpError(404, 'Event not found.');
  }

  if (existingEvent.creator_id !== req.user.id) {
    throw httpError(403, 'Only the event creator can edit this event.');
  }

  const validationError = validateEventPayload(req.body);

  if (validationError) {
    throw httpError(400, validationError);
  }

  const event = await updateEventById(req.params.id, eventPayload(req.body));
  res.json({ event });
}

export async function removeEvent(req, res) {
  const existingEvent = await findEventById(req.params.id, { userId: req.user.id });

  if (!existingEvent) {
    throw httpError(404, 'Event not found.');
  }

  if (existingEvent.creator_id !== req.user.id) {
    throw httpError(403, 'Only the event creator can delete this event.');
  }

  await deleteEventById(req.params.id);
  res.status(204).send();
}


import { findEventById } from '../models/eventModel.js';
import { createNotification } from '../models/notificationModel.js';
import { cancelRsvp, joinEvent } from '../models/rsvpModel.js';
import { httpError } from '../utils/httpError.js';

function parseEventId(body) {
  const eventId = Number(body?.eventId);

  if (!Number.isInteger(eventId) || eventId <= 0) {
    throw httpError(400, 'A valid eventId is required.');
  }

  return eventId;
}

export async function join(req, res) {
  const eventId = parseEventId(req.body);
  const event = await findEventById(eventId, { userId: req.user.id });

  if (!event) {
    throw httpError(404, 'Event not found.');
  }

  await joinEvent({ userId: req.user.id, eventId });
  await createNotification({
    userId: req.user.id,
    message: `RSVP confirmed for ${event.title} on ${event.date} at ${event.time}.`
  });

  if (event.creator_id !== req.user.id) {
    await createNotification({
      userId: event.creator_id,
      message: `${req.user.name} joined ${event.title}.`
    });
  }

  const updatedEvent = await findEventById(eventId, { userId: req.user.id });

  res.json({
    message: `You joined ${event.title}.`,
    event: updatedEvent
  });
}

export async function cancel(req, res) {
  const eventId = parseEventId(req.body);
  const event = await findEventById(eventId, { userId: req.user.id });

  if (!event) {
    throw httpError(404, 'Event not found.');
  }

  await cancelRsvp({ userId: req.user.id, eventId });
  await createNotification({
    userId: req.user.id,
    message: `Your RSVP for ${event.title} was cancelled.`
  });
  const updatedEvent = await findEventById(eventId, { userId: req.user.id });

  res.json({
    message: `Your RSVP for ${event.title} was cancelled.`,
    event: updatedEvent
  });
}

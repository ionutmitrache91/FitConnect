import { getDb } from '../database/connection.js';

export async function joinEvent({ userId, eventId }) {
  const db = await getDb();

  return db.run(
    `INSERT INTO rsvps (user_id, event_id, status, updated_at)
     VALUES (?, ?, 'joined', CURRENT_TIMESTAMP)
     ON CONFLICT(user_id, event_id)
     DO UPDATE SET status = 'joined', updated_at = CURRENT_TIMESTAMP`,
    userId,
    eventId
  );
}

export async function cancelRsvp({ userId, eventId }) {
  const db = await getDb();

  return db.run(
    `INSERT INTO rsvps (user_id, event_id, status, updated_at)
     VALUES (?, ?, 'cancelled', CURRENT_TIMESTAMP)
     ON CONFLICT(user_id, event_id)
     DO UPDATE SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP`,
    userId,
    eventId
  );
}


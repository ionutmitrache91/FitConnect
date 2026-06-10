import { getDb } from '../database/connection.js';

function eventSelect(userId) {
  return `
    SELECT
      e.id,
      e.title,
      e.description,
      e.date,
      e.time,
      e.location,
      e.category,
      e.image_url,
      e.creator_id,
      e.created_at,
      u.name AS creator_name,
      COUNT(joined.id) AS rsvp_count,
      CASE WHEN current_user_rsvp.status = 'joined' THEN 1 ELSE 0 END AS joined_by_user
    FROM events e
    JOIN users u ON u.id = e.creator_id
    LEFT JOIN rsvps joined ON joined.event_id = e.id AND joined.status = 'joined'
    LEFT JOIN rsvps current_user_rsvp
      ON current_user_rsvp.event_id = e.id
      AND current_user_rsvp.user_id = ${Number.isInteger(userId) ? userId : -1}
  `;
}

function eventGroupOrder() {
  return `
    GROUP BY e.id, current_user_rsvp.status
    ORDER BY e.date ASC, e.time ASC
  `;
}

export async function listEvents({ userId } = {}) {
  const db = await getDb();
  return db.all(`${eventSelect(userId)} ${eventGroupOrder()}`);
}

export async function listUpcomingEvents({ userId } = {}) {
  const db = await getDb();
  const today = new Date().toISOString().slice(0, 10);

  return db.all(
    `
      ${eventSelect(userId)}
      WHERE e.date >= ?
      ${eventGroupOrder()}
      LIMIT 6
    `,
    today
  );
}

export async function listJoinedEvents(userId) {
  const db = await getDb();

  return db.all(
    `
      ${eventSelect(userId)}
      JOIN rsvps joined_by_me
        ON joined_by_me.event_id = e.id
        AND joined_by_me.user_id = ?
        AND joined_by_me.status = 'joined'
      ${eventGroupOrder()}
    `,
    userId
  );
}

export async function listCreatedEvents(userId) {
  const db = await getDb();

  return db.all(
    `
      ${eventSelect(userId)}
      WHERE e.creator_id = ?
      ${eventGroupOrder()}
    `,
    userId
  );
}

export async function findEventById(id, { userId } = {}) {
  const db = await getDb();
  return db.get(
    `
      ${eventSelect(userId)}
      WHERE e.id = ?
      GROUP BY e.id, current_user_rsvp.status
    `,
    id
  );
}

export async function createEvent(event) {
  const db = await getDb();
  const result = await db.run(
    `INSERT INTO events (title, description, date, time, location, category, image_url, creator_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    event.title,
    event.description,
    event.date,
    event.time,
    event.location,
    event.category,
    event.image_url,
    event.creator_id
  );

  return findEventById(result.lastID, { userId: event.creator_id });
}

export async function updateEventById(id, event) {
  const db = await getDb();
  await db.run(
    `UPDATE events
     SET title = ?, description = ?, date = ?, time = ?, location = ?, category = ?, image_url = ?
     WHERE id = ?`,
    event.title,
    event.description,
    event.date,
    event.time,
    event.location,
    event.category,
    event.image_url,
    id
  );

  return findEventById(id);
}

export async function deleteEventById(id) {
  const db = await getDb();
  await db.run('DELETE FROM events WHERE id = ?', id);
}

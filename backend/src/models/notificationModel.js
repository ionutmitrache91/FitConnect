import { getDb } from '../database/connection.js';

export async function createNotification({ userId, message }) {
  const db = await getDb();
  const result = await db.run(
    `INSERT INTO notifications (user_id, message)
     VALUES (?, ?)`,
    userId,
    message
  );

  return db.get('SELECT * FROM notifications WHERE id = ?', result.lastID);
}

export async function listNotifications(userId, { limit } = {}) {
  const db = await getDb();
  const sqlLimit = Number.isInteger(limit) ? ` LIMIT ${limit}` : '';

  return db.all(
    `SELECT id, user_id, message, is_read, created_at
     FROM notifications
     WHERE user_id = ?
     ORDER BY datetime(created_at) DESC, id DESC${sqlLimit}`,
    userId
  );
}

export async function markAllNotificationsRead(userId) {
  const db = await getDb();

  return db.run(
    `UPDATE notifications
     SET is_read = 1
     WHERE user_id = ?`,
    userId
  );
}

export async function ensureEventReminders(userId) {
  const db = await getDb();
  const today = new Date();
  const reminderWindow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const startDate = today.toISOString().slice(0, 10);
  const endDate = reminderWindow.toISOString().slice(0, 10);

  const upcomingJoinedEvents = await db.all(
    `SELECT e.title, e.date, e.time
     FROM events e
     JOIN rsvps r ON r.event_id = e.id
     WHERE r.user_id = ?
       AND r.status = 'joined'
       AND e.date BETWEEN ? AND ?`,
    userId,
    startDate,
    endDate
  );

  for (const event of upcomingJoinedEvents) {
    const message = `Reminder: ${event.title} is on ${event.date} at ${event.time}.`;
    const existingReminder = await db.get(
      `SELECT id
       FROM notifications
       WHERE user_id = ? AND message = ?`,
      userId,
      message
    );

    if (!existingReminder) {
      await createNotification({ userId, message });
    }
  }
}

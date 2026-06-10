import {
  ensureEventReminders,
  listNotifications,
  markAllNotificationsRead
} from '../models/notificationModel.js';

export async function getNotifications(req, res) {
  await ensureEventReminders(req.user.id);
  const notifications = await listNotifications(req.user.id);

  res.json({
    notifications,
    unreadCount: notifications.filter((notification) => !notification.is_read).length
  });
}

export async function markNotificationsRead(req, res) {
  await markAllNotificationsRead(req.user.id);
  const notifications = await listNotifications(req.user.id);

  res.json({
    notifications,
    unreadCount: 0
  });
}


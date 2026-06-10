import { listCreatedEvents, listJoinedEvents, listUpcomingEvents } from '../models/eventModel.js';
import { ensureEventReminders, listNotifications } from '../models/notificationModel.js';

export async function getDashboard(req, res) {
  await ensureEventReminders(req.user.id);
  const [upcomingEvents, joinedEvents, createdEvents] = await Promise.all([
    listUpcomingEvents({ userId: req.user.id }),
    listJoinedEvents(req.user.id),
    listCreatedEvents(req.user.id)
  ]);
  const notifications = await listNotifications(req.user.id, { limit: 4 });

  res.json({
    upcomingEvents,
    joinedEvents,
    createdEvents,
    notifications,
    stats: {
      upcomingCount: upcomingEvents.length,
      joinedCount: joinedEvents.length,
      createdCount: createdEvents.length,
      unreadNotifications: notifications.filter((notification) => !notification.is_read).length
    }
  });
}

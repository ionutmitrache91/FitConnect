import { listCreatedEvents, listJoinedEvents, listUpcomingEvents } from '../models/eventModel.js';

export async function getDashboard(req, res) {
  const [upcomingEvents, joinedEvents, createdEvents] = await Promise.all([
    listUpcomingEvents({ userId: req.user.id }),
    listJoinedEvents(req.user.id),
    listCreatedEvents(req.user.id)
  ]);

  res.json({
    upcomingEvents,
    joinedEvents,
    createdEvents,
    stats: {
      upcomingCount: upcomingEvents.length,
      joinedCount: joinedEvents.length,
      createdCount: createdEvents.length
    }
  });
}


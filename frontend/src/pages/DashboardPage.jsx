import { Bell, CalendarCheck, CalendarClock, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { api, getApiErrorMessage } from '../services/api.js';

function EventSection({ title, events, emptyText, showEdit }) {
  return (
    <section className="dashboard-section">
      <h2>{title}</h2>
      {events.length === 0 ? (
        <div className="empty-state compact-empty">{emptyText}</div>
      ) : (
        <div className="event-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} showEdit={showEdit} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const { data } = await api.get('/dashboard');
        setDashboard(data);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError));
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (isLoading) {
    return <div className="page-state">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="page-state error-state">{error}</div>;
  }

  return (
    <main className="page-grid">
      <section className="section-heading">
        <p className="eyebrow dark">Dashboard</p>
        <h1>{user.name}'s fitness activity</h1>
      </section>
      <section className="stat-grid">
        <div className="stat-tile">
          <CalendarClock size={22} aria-hidden="true" />
          <strong>{dashboard.stats.upcomingCount}</strong>
          <span>Upcoming</span>
        </div>
        <div className="stat-tile">
          <CalendarCheck size={22} aria-hidden="true" />
          <strong>{dashboard.stats.joinedCount}</strong>
          <span>Joined</span>
        </div>
        <div className="stat-tile">
          <Sparkles size={22} aria-hidden="true" />
          <strong>{dashboard.stats.createdCount}</strong>
          <span>Created</span>
        </div>
        <div className="stat-tile">
          <Bell size={22} aria-hidden="true" />
          <strong>{dashboard.stats.unreadNotifications}</strong>
          <span>Unread alerts</span>
        </div>
      </section>
      <section className="dashboard-section">
        <h2>Latest notifications</h2>
        {dashboard.notifications.length === 0 ? (
          <div className="empty-state compact-empty">Notifications will appear here.</div>
        ) : (
          <div className="notification-list compact-list">
            {dashboard.notifications.map((notification) => (
              <article className={notification.is_read ? 'notification-card' : 'notification-card unread'} key={notification.id}>
                <Bell size={18} aria-hidden="true" />
                <p>{notification.message}</p>
              </article>
            ))}
          </div>
        )}
      </section>
      <EventSection
        title="Joined events"
        events={dashboard.joinedEvents}
        emptyText="Joined events will appear here."
      />
      <EventSection
        title="Created events"
        events={dashboard.createdEvents}
        emptyText="Created events will appear here."
        showEdit
      />
      <EventSection
        title="Upcoming in the community"
        events={dashboard.upcomingEvents}
        emptyText="Upcoming community events will appear here."
      />
    </main>
  );
}

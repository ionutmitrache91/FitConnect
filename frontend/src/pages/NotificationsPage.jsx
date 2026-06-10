import { Bell, CheckCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api, getApiErrorMessage } from '../services/api.js';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMarking, setIsMarking] = useState(false);

  async function loadNotifications() {
    try {
      const { data } = await api.get('/notifications');
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  async function markAllRead() {
    setIsMarking(true);
    setError('');

    try {
      const { data } = await api.patch('/notifications/read-all');
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      setIsMarking(false);
    }
  }

  return (
    <main className="page-grid narrow">
      <section className="section-heading split-heading">
        <div>
          <p className="eyebrow dark">Notifications</p>
          <h1>Activity center</h1>
        </div>
        <button className="button ghost" type="button" disabled={isMarking || unreadCount === 0} onClick={markAllRead}>
          <CheckCheck size={18} aria-hidden="true" />
          <span>Mark read</span>
        </button>
      </section>

      {isLoading && <div className="page-state">Loading notifications...</div>}
      {error && <div className="page-state error-state">{error}</div>}
      {!isLoading && !error && notifications.length === 0 && (
        <div className="empty-state">
          <Bell size={28} aria-hidden="true" />
          No notifications yet.
        </div>
      )}
      {!isLoading && !error && notifications.length > 0 && (
        <section className="notification-list" aria-label={`${unreadCount} unread notifications`}>
          {notifications.map((notification) => (
            <article className={notification.is_read ? 'notification-card' : 'notification-card unread'} key={notification.id}>
              <Bell size={19} aria-hidden="true" />
              <div>
                <p>{notification.message}</p>
                <time dateTime={notification.created_at}>{new Date(notification.created_at).toLocaleString()}</time>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}


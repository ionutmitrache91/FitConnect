import { CalendarDays, CheckCircle2, LogIn, MapPin, Pencil, UserRound, Users, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api, getApiErrorMessage } from '../services/api.js';
import { DEFAULT_EVENT_IMAGE, handleImageFallback } from '../utils/images.js';

export default function EventDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [isRsvpLoading, setIsRsvpLoading] = useState(false);

  useEffect(() => {
    async function loadEvent() {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data.event);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError));
      } finally {
        setIsLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  if (isLoading) {
    return <div className="page-state">Loading event...</div>;
  }

  if (error && !event) {
    return <div className="page-state error-state">{error}</div>;
  }

  const canEdit = user?.id === event.creator_id;

  async function updateRsvp(action) {
    setIsRsvpLoading(true);
    setRsvpMessage('');
    setError('');

    try {
      const { data } = await api.post(`/rsvp/${action}`, { eventId: event.id });
      setEvent(data.event);
      setRsvpMessage(data.message);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      setIsRsvpLoading(false);
    }
  }

  return (
    <main className="event-detail">
      <img className="event-banner" src={event.image_url || DEFAULT_EVENT_IMAGE} alt="" onError={handleImageFallback} />
      <section className="event-detail-content">
        <div className="event-title-row">
          <div>
            <p className="eyebrow dark">{event.category}</p>
            <h1>{event.title}</h1>
          </div>
          {canEdit && (
            <Link className="button ghost" to={`/events/${event.id}/edit`}>
              <Pencil size={18} aria-hidden="true" />
              <span>Edit</span>
            </Link>
          )}
        </div>
        <div className="detail-meta">
          <span>
            <CalendarDays size={18} aria-hidden="true" />
            {event.date} at {event.time}
          </span>
          <span>
            <MapPin size={18} aria-hidden="true" />
            {event.location}
          </span>
          <span>
            <Users size={18} aria-hidden="true" />
            {event.rsvp_count || 0} attending
          </span>
          <span>
            <UserRound size={18} aria-hidden="true" />
            Hosted by {event.creator_name}
          </span>
        </div>
        <p className="event-description">{event.description}</p>
        <div className="rsvp-panel">
          {user ? (
            Boolean(event.joined_by_user) ? (
              <button className="button danger" type="button" disabled={isRsvpLoading} onClick={() => updateRsvp('cancel')}>
                <XCircle size={18} aria-hidden="true" />
                <span>{isRsvpLoading ? 'Updating...' : 'Cancel RSVP'}</span>
              </button>
            ) : (
              <button className="button primary" type="button" disabled={isRsvpLoading} onClick={() => updateRsvp('join')}>
                <CheckCircle2 size={18} aria-hidden="true" />
                <span>{isRsvpLoading ? 'Joining...' : 'Join event'}</span>
              </button>
            )
          ) : (
            <Link className="button primary" to="/login">
              <LogIn size={18} aria-hidden="true" />
              <span>Login to RSVP</span>
            </Link>
          )}
          {rsvpMessage && <span className="inline-success">{rsvpMessage}</span>}
          {error && <span className="inline-error">{error}</span>}
        </div>
      </section>
    </main>
  );
}

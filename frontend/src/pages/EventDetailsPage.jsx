import { CalendarDays, MapPin, Pencil, UserRound, Users } from 'lucide-react';
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

  if (error) {
    return <div className="page-state error-state">{error}</div>;
  }

  const canEdit = user?.id === event.creator_id;

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
      </section>
    </main>
  );
}


import { CalendarDays, MapPin, Pencil, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEFAULT_EVENT_IMAGE, handleImageFallback } from '../utils/images.js';

export default function EventCard({ event, showEdit = false }) {
  return (
    <article className="event-card">
      <Link className="event-image-link" to={`/events/${event.id}`} aria-label={event.title}>
        <img src={event.image_url || DEFAULT_EVENT_IMAGE} alt="" onError={handleImageFallback} />
      </Link>
      <div className="event-card-body">
        <div className="event-card-topline">
          <span className="pill">{event.category}</span>
          <span className="attendee-count">
            <Users size={16} aria-hidden="true" />
            {event.rsvp_count || 0}
          </span>
        </div>
        <h2>
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </h2>
        <p>{event.description}</p>
        <div className="event-meta">
          <span>
            <CalendarDays size={16} aria-hidden="true" />
            {event.date} at {event.time}
          </span>
          <span>
            <MapPin size={16} aria-hidden="true" />
            {event.location}
          </span>
        </div>
        <div className="event-card-actions">
          <Link className="button ghost" to={`/events/${event.id}`}>
            View
          </Link>
          {showEdit && (
            <Link className="icon-button" to={`/events/${event.id}/edit`} title="Edit event">
              <Pencil size={17} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}


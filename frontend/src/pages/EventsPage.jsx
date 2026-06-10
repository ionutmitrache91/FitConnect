import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import EventCard from '../components/EventCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { api, getApiErrorMessage } from '../services/api.js';

export default function EventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const { data } = await api.get('/events');
        setEvents(data.events);
      } catch (apiError) {
        setError(getApiErrorMessage(apiError));
      } finally {
        setIsLoading(false);
      }
    }

    loadEvents();
  }, []);

  const categories = useMemo(() => ['All', ...new Set(events.map((event) => event.category))], [events]);
  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return events.filter((event) => {
      const matchesCategory = category === 'All' || event.category === category;
      const matchesQuery =
        !normalizedQuery ||
        event.title.toLowerCase().includes(normalizedQuery) ||
        event.location.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [events, category, query]);

  return (
    <main className="page-grid">
      <section className="section-heading split-heading">
        <div>
          <p className="eyebrow dark">Events</p>
          <h1>Find your next session</h1>
        </div>
        <div className="event-toolbar">
          <label className="search-field">
            <Search size={18} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search events" />
          </label>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </section>

      {isLoading && <div className="page-state">Loading events...</div>}
      {error && <div className="page-state error-state">{error}</div>}
      {!isLoading && !error && filteredEvents.length === 0 && <div className="empty-state">No events match your filters.</div>}
      {!isLoading && !error && filteredEvents.length > 0 && (
        <section className="event-grid">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} showEdit={user?.id === event.creator_id} />
          ))}
        </section>
      )}
    </main>
  );
}


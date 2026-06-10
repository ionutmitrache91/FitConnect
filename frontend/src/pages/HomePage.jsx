import { ArrowRight, CalendarCheck, MapPin, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard.jsx';
import { api } from '../services/api.js';

export default function HomePage() {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    async function loadFeaturedEvents() {
      try {
        const { data } = await api.get('/events');
        setFeaturedEvents(data.events.slice(0, 3));
      } catch {
        setFeaturedEvents([]);
      }
    }

    loadFeaturedEvents();
  }, []);

  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Fitness meetups made simple</p>
          <h1>FitConnect</h1>
          <p>Find local runs, yoga sessions, hikes, rides, and wellness events in one place.</p>
          <div className="hero-actions">
            <Link className="button primary large" to="/events">
              <CalendarCheck size={20} aria-hidden="true" />
              <span>Explore events</span>
            </Link>
            <Link className="button glass large" to="/register">
              <ArrowRight size={20} aria-hidden="true" />
              <span>Join FitConnect</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-band">
        <div className="metric">
          <MapPin size={22} aria-hidden="true" />
          <strong>Local-first</strong>
          <span>Meetups built around real places and real routines.</span>
        </div>
        <div className="metric">
          <Sparkles size={22} aria-hidden="true" />
          <strong>Wellness range</strong>
          <span>Running, yoga, hiking, cycling, bootcamps, and recovery sessions.</span>
        </div>
        <div className="metric">
          <CalendarCheck size={22} aria-hidden="true" />
          <strong>Simple RSVP</strong>
          <span>Join, cancel, and track events from your dashboard.</span>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow dark">Featured events</p>
            <h1>Move with your community</h1>
          </div>
          <Link className="button ghost" to="/events">
            Explore all
          </Link>
        </div>
        <div className="event-grid compact">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </main>
  );
}

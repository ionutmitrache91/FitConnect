import { ArrowRight, CalendarCheck, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
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
    </main>
  );
}


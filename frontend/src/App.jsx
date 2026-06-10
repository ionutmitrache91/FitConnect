import { Routes, Route } from 'react-router-dom';

function HomePage() {
  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Fitness meetups made simple</p>
          <h1>FitConnect</h1>
          <p>Find local runs, yoga sessions, hikes, rides, and wellness events in one place.</p>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}


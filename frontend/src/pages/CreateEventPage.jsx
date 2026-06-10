import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm, { emptyEventForm } from '../components/EventForm.jsx';
import { api, getApiErrorMessage } from '../services/api.js';

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyEventForm);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { data } = await api.post('/events', form);
      navigate(`/events/${data.event.id}`);
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-grid form-page">
      <section className="section-heading">
        <p className="eyebrow dark">Create event</p>
        <h1>Host a fitness meetup</h1>
      </section>
      <EventForm
        form={form}
        error={error}
        isSubmitting={isSubmitting}
        submitLabel="Create event"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </main>
  );
}


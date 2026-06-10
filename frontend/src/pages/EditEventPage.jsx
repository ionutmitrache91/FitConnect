import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventForm, { emptyEventForm } from '../components/EventForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { api, getApiErrorMessage } from '../services/api.js';

export default function EditEventPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyEventForm);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadEvent() {
      try {
        const { data } = await api.get(`/events/${id}`);

        if (data.event.creator_id !== user.id) {
          setError('Only the event creator can edit this event.');
          return;
        }

        setForm({
          title: data.event.title,
          description: data.event.description,
          date: data.event.date,
          time: data.event.time,
          location: data.event.location,
          category: data.event.category,
          image_url: data.event.image_url
        });
      } catch (apiError) {
        setError(getApiErrorMessage(apiError));
      } finally {
        setIsLoading(false);
      }
    }

    loadEvent();
  }, [id, user.id]);

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { data } = await api.put(`/events/${id}`, form);
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
        <p className="eyebrow dark">Edit event</p>
        <h1>Update event details</h1>
      </section>
      {isLoading ? (
        <div className="page-state">Loading event...</div>
      ) : (
        <EventForm
          form={form}
          error={error}
          isSubmitting={isSubmitting}
          submitLabel="Save changes"
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
}


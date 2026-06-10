import { Save } from 'lucide-react';

const categories = ['Running', 'Yoga', 'Hiking', 'Cycling', 'Bootcamp', 'Wellness'];

export const emptyEventForm = {
  title: '',
  description: '',
  date: '',
  time: '',
  location: '',
  category: 'Running',
  image_url: ''
};

export default function EventForm({ form, error, isSubmitting, submitLabel, onChange, onSubmit }) {
  return (
    <form className="form-stack event-form" onSubmit={onSubmit}>
      <label>
        Title
        <input name="title" value={form.title} onChange={onChange} required minLength={4} />
      </label>
      <label>
        Description
        <textarea name="description" value={form.description} onChange={onChange} required minLength={12} />
      </label>
      <div className="form-row">
        <label>
          Date
          <input name="date" type="date" value={form.date} onChange={onChange} required />
        </label>
        <label>
          Time
          <input name="time" type="time" value={form.time} onChange={onChange} required />
        </label>
      </div>
      <div className="form-row">
        <label>
          Location
          <input name="location" value={form.location} onChange={onChange} required />
        </label>
        <label>
          Category
          <select name="category" value={form.category} onChange={onChange} required>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label>
        Event Image URL
        <input name="image_url" type="url" value={form.image_url} onChange={onChange} />
      </label>
      {error && <p className="form-error">{error}</p>}
      <button className="button primary" type="submit" disabled={isSubmitting}>
        <Save size={18} aria-hidden="true" />
        <span>{isSubmitting ? 'Saving...' : submitLabel}</span>
      </button>
    </form>
  );
}


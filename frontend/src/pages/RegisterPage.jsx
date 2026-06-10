import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getApiErrorMessage } from '../services/api.js';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register(form);
      navigate('/dashboard');
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-panel">
        <p className="eyebrow dark">Start moving</p>
        <h1>Create account</h1>
        <form className="form-stack" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" autoComplete="name" value={form.name} onChange={updateField} required minLength={2} />
          </label>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} required />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={updateField}
              required
              minLength={8}
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="button primary full" type="submit" disabled={isSubmitting}>
            <UserPlus size={18} aria-hidden="true" />
            <span>{isSubmitting ? 'Creating...' : 'Create account'}</span>
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}


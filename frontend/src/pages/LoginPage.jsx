import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { getApiErrorMessage } from '../services/api.js';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || '/dashboard';

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(form);
      navigate(redirectTo, { replace: true });
    } catch (apiError) {
      setError(getApiErrorMessage(apiError));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-panel">
        <p className="eyebrow dark">Welcome back</p>
        <h1>Login</h1>
        <form className="form-stack" onSubmit={handleSubmit}>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" value={form.email} onChange={updateField} required />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={updateField}
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="button primary full" type="submit" disabled={isSubmitting}>
            <LogIn size={18} aria-hidden="true" />
            <span>{isSubmitting ? 'Logging in...' : 'Login'}</span>
          </button>
        </form>
        <p className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}


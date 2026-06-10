import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken } from '../services/api.js';

const AuthContext = createContext(null);
const storageKey = 'fitconnect-session';

function loadStoredSession() {
  try {
    const rawSession = localStorage.getItem(storageKey);
    return rawSession ? JSON.parse(rawSession) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => loadStoredSession());
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    setAuthToken(session?.token);

    if (session) {
      localStorage.setItem(storageKey, JSON.stringify(session));
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [session]);

  useEffect(() => {
    async function refreshProfile() {
      if (!session?.token) {
        setIsBootstrapping(false);
        return;
      }

      try {
        const { data } = await api.get('/users/me');
        setSession((current) => (current ? { ...current, user: data.user } : current));
      } catch {
        setSession(null);
      } finally {
        setIsBootstrapping(false);
      }
    }

    refreshProfile();
  }, []);

  async function register(payload) {
    const { data } = await api.post('/auth/register', payload);
    setSession(data);
    return data.user;
  }

  async function login(payload) {
    const { data } = await api.post('/auth/login', payload);
    setSession(data);
    return data.user;
  }

  function logout() {
    setSession(null);
  }

  const value = useMemo(
    () => ({
      user: session?.user || null,
      token: session?.token || null,
      isBootstrapping,
      register,
      login,
      logout
    }),
    [session, isBootstrapping]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}


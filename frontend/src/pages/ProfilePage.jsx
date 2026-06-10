import { Mail, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <main className="page-grid narrow">
      <section className="section-heading">
        <p className="eyebrow dark">Profile</p>
        <h1>{user.name}</h1>
      </section>
      <section className="profile-panel">
        <div>
          <UserRound size={22} aria-hidden="true" />
          <span>{user.name}</span>
        </div>
        <div>
          <Mail size={22} aria-hidden="true" />
          <span>{user.email}</span>
        </div>
      </section>
    </main>
  );
}


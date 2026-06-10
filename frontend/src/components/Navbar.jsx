import { Activity, Bell, CalendarPlus, LayoutDashboard, LogIn, LogOut, UserPlus } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const navItems = [
  { to: '/events', label: 'Events', icon: Activity, public: true },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/create-event', label: 'Create', icon: CalendarPlus },
  { to: '/notifications', label: 'Alerts', icon: Bell }
];

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <Activity size={24} aria-hidden="true" />
        <span>FitConnect</span>
      </Link>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems
          .filter((item) => item.public || user)
          .map((item) => {
            const Icon = item.icon;

            return (
              <NavLink key={item.to} to={item.to} title={item.label}>
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <NavLink className="profile-link" to="/profile" title="Profile">
              {user.name}
            </NavLink>
            <button className="icon-button" type="button" onClick={logout} title="Log out">
              <LogOut size={18} aria-hidden="true" />
            </button>
          </>
        ) : (
          <>
            <NavLink className="button ghost" to="/login">
              <LogIn size={18} aria-hidden="true" />
              <span>Login</span>
            </NavLink>
            <NavLink className="button primary" to="/register">
              <UserPlus size={18} aria-hidden="true" />
              <span>Register</span>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}

import { NavLink } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Sidebar">
      <nav className="sidebar-nav">
        <NavLink
          to="/feed"
          className={({ isActive }) => `sidebar-btn ${isActive ? 'active' : ''}`}
          aria-label="Feed"
          title="Home"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 11l9-8 9 8" />
            <path d="M5 10v10h14V10" />
          </svg>
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) => `sidebar-btn ${isActive ? 'active' : ''}`}
          aria-label="Explore"
          title="Explore"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M15.8 8.2l-2.4 6.2-6.2 2.4 2.4-6.2 6.2-2.4z" />
          </svg>
        </NavLink>
      </nav>

      <div className="sidebar-divider" />

      <nav className="sidebar-nav sidebar-nav-bottom">
        <NavLink
          to="/profile"
          className={({ isActive }) => `sidebar-btn sidebar-profile-btn ${isActive ? 'active' : ''}`}
          aria-label="Profile"
          title="Profile"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="8" r="3.6" />
            <path d="M5 20a7 7 0 0 1 14 0" />
          </svg>
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) => `sidebar-btn ${isActive ? 'active' : ''}`}
          aria-label="Submit a photo"
          title="Submit photo"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3.5" y="5" width="17" height="14" rx="2" />
            <path d="M12 9v6" />
            <path d="M9 12h6" />
          </svg>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
